const DonorRepository = require("../repository/donor.repository");
const { publish, waitForResponse } = require("../broker/producer");
const topics = require("../broker/topics");
const { v4: uuidv4 } = require("uuid");
const DonorInternalDTO = require("../dtos/donor.internal.dto");
const DonorExternalDTO = require("../dtos/donor.external.dto");

/**
 * Service layer for managing donor-related business logic.
 * Handles business logic and delegates data operations to the repository layer.
 */
class DonorService {
  /**
   * Creates a new donor.
   *
   *
   * @param {Object} donorData - The data for the new donor.
   * @throws {Error} If user validation fails or address validation fails.
   * @returns {Promise<Object>} - The created donor object.
   */
  static async createDonor(donorData) {
    const correlationId = uuidv4();

    console.log(
      `[DonorService] Validating userId "${donorData.userId}" with correlationId "${correlationId}"`
    );

    // Publish validation request to Kafka
    await publish({
      topic: topics.DONOR_USER_VALIDATE,
      event: "validate_user",
      message: { userId: donorData.userId, correlationId },
    });

    console.log(
      `[DonorService] Published validation request for userId "${donorData.userId}"`
    );

    try {
      // Wait for validation response
      const validationResponse = await waitForResponse(
        correlationId,
        "donorValidation"
      );
      console.log(
        `[DonorService] Received validation response:`,
        validationResponse
      );

      if (!validationResponse.isValid) {
        throw new Error(
          `User validation failed for userId "${donorData.userId}"`
        );
      }

      // Attach the validated userId to the donor data
      donorData.userId = validationResponse.userId;
      const createdDonor = await DonorRepository.create(donorData);
      // Return as internal DTO
      return new DonorInternalDTO(createdDonor.toObject());
    } catch (error) {
      console.error(
        `[DonorService] Error during donor creation for userId "${donorData.userId}":`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Retrieves all donors.
   * Delegates the retrieval to the repository.
   *
   * @returns {Promise<Array>} - List of donor objects.
   */
  static async getAllDonors() {
    const donors = await DonorRepository.findAll();

    // Map donors to external DTOs
    return donors.map((donor) => new DonorExternalDTO(donor.toObject()));
  }

  /**
   * Retrieves a donor by ID.
   *
   * @param {string} donorId - The ID of the donor to retrieve.
   * @throws {Error} If the donor is not found.
   * @returns {Promise<Object>} The donor object.
   */
  static async getDonorById(donorId) {
    const donor = await DonorRepository.findById(donorId);
    if (!donor) {
      throw new Error("Donor not found");
    }
    return new DonorExternalDTO(donor.toObject());
  }

  /**
   * Fetch stripeId of donor by donorId
   *
   * @param {String} donorId - The ID of the donor to retrieve the stripeId.
   * @throws {Error} If the donor is not found or stripeId is missing.
   * @returns {Promise<String>} - The stripeId of the donor.
   */
  static async getDonorStripeId(donorId) {
    const donor = await DonorRepository.findById(donorId);
    if (!donor || !donor.stripeId) {
      throw new Error("Stripe ID not found for this donor");
    }
    return { stripeId: donor.stripeId };
  }

  /**
   * Updates an existing donor.
   * Validates user and address data before delegating the update to the repository.
   *
   * @param {string} donorId - ID of the donor to update.
   * @param {Object} updatedData - Updated donor data.
   * @throws {Error} If the donor or associated data is not found.
   * @returns {Promise<Object>} - The updated donor object.
   */
  static async updateDonor(donorId, updatedData) {
    // Validate userId
    if (updatedData.userId) {
      const userExists = await DonorRepository.userExists(updatedData.userId);
      if (!userExists) {
        throw new Error("User not found for the provided userId");
      }
    }

    // Validate address IDs
    if (updatedData.address && updatedData.address.length > 0) {
      for (const addressId of updatedData.address) {
        const addressExists = await DonorRepository.addressExists(addressId);
        if (!addressExists) {
          throw new Error(`Address with ID ${addressId} not found`);
        }
      }
    }

    // Ensure donationStat defaults
    if (updatedData.donationStat) {
      updatedData.donationStat.totalDonation =
        updatedData.donationStat.totalDonation || 0;
      updatedData.donationStat.monthlyDonated =
        updatedData.donationStat.monthlyDonated || 0;
      updatedData.donationStat.projectsDonated =
        updatedData.donationStat.projectsDonated || 0;
    }

    const updatedDonor = await DonorRepository.update(donorId, updatedData);
    if (!updatedDonor) {
      throw new Error("Donor not found");
    }

    return new DonorExternalDTO(updatedDonor.toObject());
  }

  /**
   * Deletes a donor by ID.
   *
   * @param {string} donorId - The ID of the donor to delete.
   * @throws {Error} If the donor is not found.
   * @returns {Promise<Object>} The deleted donor object.
   */
  static async deleteDonor(donorId) {
    const deletedDonor = await DonorRepository.delete(donorId);
    if (!deletedDonor) {
      throw new Error("Donor not found");
    }

    // Return as Internal DTO
    return new DonorInternalDTO(deletedDonor.toObject());
  }

  /**
   * Fetches donor email by donor ID.
   * @param {string} donorId - The ID of the donor.
   * @throws {Error} If the donor or email is not found.
   * @returns {Promise<string>} The email address of the donor.
   */
  static async getEmailByDonorId(donorId) {
    const donor = await DonorRepository.findById(donorId);

    if (!donor) {
      throw new Error(`Donor not found with ID "${donorId}"`);
    }

    const correlationId = uuidv4();
    const userId = donor.userId;

    console.log(
      `[DonorService] Publishing email request for userId "${userId}" with correlationId "${correlationId}"`
    );

    // Publish a Kafka request to fetch the email
    console.log(
      `[DonorService] Requesting email for userId "${donor.userId}" with correlationId "${correlationId}"`
    );

    await publish({
      topic: topics.GET_USER_EMAIL,
      event: "fetch_email",
      message: {
        userId,
        correlationId,
      },
    });

    console.log(
      `[DonorService] Waiting for email response for correlationId "${correlationId}"`
    );

    try {
      const response = await waitForResponse(
        correlationId,
        "donorGetUserEmail"
      );
      console.log(
        `[DonorService] Received email response for userId "${donor.userId}":`,
        response
      );

      if (!response.email) {
        throw new Error(`Email not found for userId "${donor.userId}"`);
      }

      return response.email;
    } catch (error) {
      console.error(
        `[DonorService] Error fetching email for userId "${donor.userId}":`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Verifies if a donor exists by their ID.
   *
   *
   * @param {string} donorId - The ID of the donor.
   * @returns {Promise<boolean>} True if the donor exists, false otherwise.
   */
  static async verifyDonorExists(donorId) {
    const donor = await DonorRepository.findById(donorId);
    return !!donor;
  }

  /**
   * Retrieves donation statistics for a donor.
   *
   * @param {string} donorId - The ID of the donor.
   * @returns {Promise<Object>} An object containing donation statistics.
   */
  static async getDonorStats(donorId) {
    const donor = await DonorRepository.findById(donorId);
    if (!donor) {
      throw new Error("Donor not found");
    }

    // Extract donation stats
    const stats = {
      totalDonations: donor.donationStat.totalDonation || 0,
      projectsDonated: donor.donationStat.projectsDonated || 0,
    };

    return stats;
  }

  /**
   * Updates donation statistics for a donor.
   *
   *
   * @param {string} donorId - The ID of the donor.
   * @param {number} donationAmount - The amount of the donation.
   * @param {string} projectId - The ID of the project.
   */
  static async updateDonationStats(donorId, donationAmount, projectId) {
    const donor = await DonorRepository.findById(donorId);
    if (!donor) {
      throw new Error("Donor not found");
    }

    donor.donationStat.totalDonation += donationAmount;
    donor.donationStat.projectsDonated += 1;

    const updatedDonor = await DonorRepository.update(donorId, {
      donationStat: donor.donationStat,
    });

    // Return as Internal DTO
    return new DonorInternalDTO(updatedDonor.toObject());
  }

  /**
   * Retrieves global donation statistics.
   *
   *
   * @returns {Promise<Object>} An object containing global donation statistics.
   */
  static async getGlobalDonorStats() {
    const donors = await DonorRepository.findAll();
    const totalDonors = donors.length;
    const totalDonations = donors.reduce(
      (sum, donor) => sum + (donor.donationStat.totalDonation || 0),
      0
    );
    const projectsDonated = donors.reduce(
      (sum, donor) => sum + (donor.donationStat.projectsDonated || 0),
      0
    );

    return { totalDonors, totalDonations, projectsDonated };
  }

  /**
   * Retrieves filtered donation statistics.
   *
   *
   * @param {string} category - The category of the subscription.
   * @param {string} region - The region of the subscription.
   * @returns {Promise<Object>} An object containing filtered donation statistics.
   */
  static async getFilteredDonorStats({ category, region }) {
    const filters = {};
    if (category) filters["subscription.category"] = category;
    if (region) filters.region = region;

    const donors = await DonorRepository.findAll(filters);
    const totalDonations = donors.reduce(
      (sum, donor) => sum + (donor.donationStat.totalDonation || 0),
      0
    );

    return donors.map(
      (donor) => new DonorExternalDTO({ ...donor.toObject(), totalDonations })
    );
  }

  /**
   * Retrieves the top 10 donors based on total donations.
   *
   *
   * @returns {Promise<Array>} An array of top 10 donors.
   */
  static async getTopDonors() {
    const donors = await DonorRepository.findAll();
    return donors
      .sort(
        (a, b) =>
          (b.donationStat.totalDonation || 0) -
          (a.donationStat.totalDonation || 0)
      )
      .sort(
        (a, b) =>
          (b.donationStat.totalDonation || 0) -
          (a.donationStat.totalDonation || 0)
      )
      .slice(0, 10)
      .map((donor) => ({
        id: donor.id,
        name: `${donor.firstName} ${donor.lastName}`,
        totalDonation: donor.donationStat.totalDonation,
      }));
  }

  /**
   * Retrieves the top monthly donors with enriched data.
   * @throws {Error} If the top donors or enriched data cannot be fetched.
   * @returns {Promise<Object[]>} The list of enriched top donors.
   */
  static async getTopDonorsMonthly() {
    const correlationId = uuidv4();

    // Fetch top donors from the Donor Service database
    const donors = await DonorRepository.findAll();
    const sorted = donors
      .sort(
        (a, b) =>
          (b.donationStat.monthlyDonated || 0) -
          (a.donationStat.monthlyDonated || 0)
      )
      .slice(0, 10)
      .map(
        (donor) =>
          new DonorExternalDTO({
            userId: donor.userId,
            name: `${donor.firstName} ${donor.lastName}`,
            monthlyDonated: donor.donationStat.monthlyDonated,
          })
      );

    // Publish top donors request
    await publish({
      topic: topics.GET_TOP_MONTHLY_USER,
      event: "fetch_top_donors",
      message: { userList: sorted, correlationId },
    });

    // Wait for enrichment response
    try {
      const response = await waitForResponse(
        correlationId,
        "donorGetTopMonthlyUser"
      );
      console.log(
        `[DonorService] Received enriched top donors response with correlationId "${correlationId}":`,
        response
      );

      if (!response.userTopMonthlyWithAvatar) {
        throw new Error(`Failed to enrich top monthly donors`);
      }

      return response.userTopMonthlyWithAvatar;
    } catch (error) {
      console.error(
        `[DonorService] Error fetching enriched top monthly donors:`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Retrieves projects and donations of a donor.
   *
   * @param {string} userId - The ID of the donor.
   * @returns {Promise<Object>} An object containing projects and donations of the donor.
   */
  static async getProjectsAndDonationsOfDonor(userId) {
    const donor = await DonorRepository.findById(userId);
    if (!donor) throw new Error("Donor not found");

    return {
      totalProjectsDonated: donor.donationStat.projectsDonated || 0,
      monthlyDonated: donor.donationStat.monthlyDonated || 0,
      totalDonations: donor.donationStat.totalDonation || 0,
    };
  }
}

module.exports = DonorService;
