const CharityRepository = require("../repository/charity.repository");
const { publish, waitForResponse } = require("../broker/producer");
const topics = require("../broker/topics");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const InternalCharityDTO = require("../dtos/charity.internal.dto");
const ExternalCharityDTO = require("../dtos/charity.external.dto");

/**
 * Service layer for managing charity entities.
 * Handles business logic and delegates data operations to the repository layer.
 */
class CharityService {
  /**
   * Creates a new charity entity.
   * @param {Object} charityData - The data for the new charity.
   * @returns {Promise<Object>} - The created charity entity.
   */
  static async createCharity(charityData) {
    const { userId } = charityData;

    const correlationId = uuidv4();
    console.log(
      `[CharityService] Validating userId "${userId}" with correlationId "${correlationId}"`
    );

    // Publish validation request
    await publish({
      topic: topics.CHARITY_USER_VALIDATE,
      event: "validate_user",
      message: { userId, correlationId },
    });

    try {
      // Wait for validation response
      const validationResponse = await waitForResponse(
        correlationId,
        "charityValidation"
      );

      console.log(
        `[CharityService] Received validation response:`,
        validationResponse
      );

      if (!validationResponse.isValid) {
        throw new Error(`User validation failed for userId "${userId}"`);
      }

      return await CharityRepository.create(charityData);
    } catch (error) {
      console.error(
        `[CharityService] Error during charity creation for userId "${userId}":`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Retrieves all charities.
   *
   * @returns {Promise<Array>} List of all charities.
   */
  static async getAllCharities() {
    const charities = await CharityRepository.findAll();

    return charities;
  }

  /**
   * Retrieves a single charity by ID.
   *
   * @param {String} charityId - ID of the charity to retrieve.
   * @throws {Error} If the charity is not found.
   * @returns {Promise<Object>} The retrieved charity entity.
   */
  static async getCharityById(charityId) {
    const charity = await CharityRepository.findById(charityId);
    if (!charity) {
      throw new Error("Charity not found");
    }
    return new ExternalCharityDTO(charity.toObject());
  }

  /**
   * Retrieve stripeId of charity by id
   *
   * @param {String} charityId - ID of the charity to retrieve the stripeId.
   * @throws {Error} If the charity is not found or stripeId is missing.
   * @returns {Promise<String>} The stripeId of the charity.
   */
  static async getCharityStripeId(charityId) {
    const charity = await CharityRepository.findById(charityId);
    if (!charity) {
      throw new Error("Charity not found");
    }
    if (!charity.stripeId) {
      throw new Error("Stripe ID not found for this charity");
    }
    return charity.stripeId;
  }

  /**
   * Updates an existing charity entity.
   * Validates user and address IDs before delegating the update to the repository.
   *
   * @param {String} charityId - ID of the charity to update.
   * @param {Object} updatedData - Data to update the charity with.
   * @throws {Error} If userId or addresses are invalid, or charity is not found.
   * @returns {Promise<Object>} The updated charity entity.
   */
  static async updateCharity(charityId, updatedData) {
    // Validate userId
    if (updatedData.userId) {
      const userExists = await CharityRepository.userExists(updatedData.userId);
      if (!userExists) {
        throw new Error("User not found for the provided userId");
      }
    }

    // // Validate addresses
    // if (updatedData.address && updatedData.address.length > 0) {
    //   for (const addressId of updatedData.address) {
    //     const addressExists = await CharityRepository.addressExists(addressId);
    //     if (!addressExists) {
    //       throw new Error(`Address with ID ${addressId} not found`);
    //     }
    //   }
    // }

    const updatedCharity = await CharityRepository.update(
      charityId,
      updatedData
    );
    if (!updatedCharity) {
      throw new Error("Charity not found");
    }

    // Return as External DTO
    return new ExternalCharityDTO(updatedCharity.toObject());
  }

  /**
   * Deletes a charity entity by ID.
   *
   * @param {String} charityId - ID of the charity to delete.
   * @throws {Error} If the charity is not found.
   * @returns {Promise<Object>} The deleted charity entity.
   */
  static async deleteCharity(charityId) {
    const deletedCharity = await CharityRepository.delete(charityId);
    if (!deletedCharity) {
      throw new Error("Charity not found");
    }

    // Return as Internal DTO
    return new InternalCharityDTO(deletedCharity.toObject());
  }

  /**
   * Get charity names by an array of IDs, ignoring invalid IDs.
   *
   * @param {Array<String>} charityIds - An array of charity IDs.
   * @returns {Promise<Array>} - An array of objects containing `id` and `name`.
   */
  static async getCharityNamesByIds(charityIds) {
    // Filter out invalid ObjectIds
    const validIds = charityIds.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (validIds.length === 0) {
      return []; // Return an empty array if no valid IDs exist
    }

    const charities = await CharityRepository.getCharityNamesByIds(validIds);
    return charities.map(
      (charity) =>
        new ExternalCharityDTO({ id: charity._id, name: charity.name })
    );
  }

  /**
   * Verify if a charity ID exists.
   *
   * @param {String} charityId - The ID of the charity to verify.
   * @returns {Promise<Boolean>} - True if the charity exists, otherwise false.
   */
  static async verifyCharityExists(charityId) {
    if (!charityId) {
      throw new Error("Charity ID is required");
    }

    return await CharityRepository.verifyCharityExists(charityId);
  }

  /**
   * Retrieves IDs of charities whose names contain the specified keyword.
   *
   * @param {String} keyword - The keyword to search for in charity names.
   * @returns {Promise<Array>} - A list of charity IDs matching the keyword.
   */
  static async getCharitiesByKeyword(keyword) {
    if (!keyword || typeof keyword !== "string") {
      throw new Error("Keyword must be a non-empty string");
    }
    return await CharityRepository.findCharitiesByKeyword(keyword);
  }

  /**
   * Retrieves a specific charity by its ID.
   *
   * @param {String} charityId - The ID of the charity to retrieve.
   * @returns {Promise<Object|null>} - The charity document if found, or null if not found.
   */
  static async getCharityByCharityId(charityId) {
    if (!mongoose.Types.ObjectId.isValid(charityId)) {
      throw new Error("Invalid charity ID");
    }
    const charity = await CharityRepository.findCharityByCharityId(charityId);
    if (!charity) {
      throw new Error("Charity not found");
    }
    return charity;
  }

  /**
   * Retrieves the user ID associated with a specific charity by its ID.
   *
   * @param {String} charityId - The ID of the charity to retrieve the user ID for.
   * @returns {Promise<String>} - The user ID associated with the charity.
   */
  static async getUserIdByCharityId(charityId) {
    if (!mongoose.Types.ObjectId.isValid(charityId)) {
      throw new Error("Invalid charity ID");
    }
    const userId = await CharityRepository.findUserIdByCharityId(charityId);
    if (!userId) {
      throw new Error("User ID not found for the given charity ID");
    }
    return userId;
  }
}

module.exports = CharityService;
