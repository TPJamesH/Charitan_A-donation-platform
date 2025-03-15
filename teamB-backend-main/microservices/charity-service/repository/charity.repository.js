const Charity = require("../models/charity.model"); // Charity model
const User = require("../models/user.model"); // User model for validation
const Address = require("/address-service/models/address.model"); // Address model for validation

/**
 * Repository class for interacting with the Charity model.
 * Encapsulates all database queries related to charities.
 */
class CharityRepository {
  /**
   * Creates a new charity in the database.
   *
   * @param {Object} charityData - The data for the new charity.
   * @returns {Promise<Object>} - The created charity document.
   */
  static async create(charityData) {
    const charity = new Charity(charityData); // Create a new Charity instance
    return await charity.save(); // Save the charity to the database
  }

  /**
   * Retrieves all charities from the database.
   *
   * @returns {Promise<Array>} - A list of all charities, including populated user and address fields.
   */
  static async findAll() {
    return await Charity.find();
    //.populate("userId", "email avatar") // Populate user information (email and avatar)
    //.populate("address"); // Populate address details
  }

  // /**
  //  * Retrieves a specific charity by its ID.
  //  *
  //  * @param {String} userId - The ID of the charity to retrieve.
  //  * @returns {Promise<Object|null>} - The charity document if found, or null if not found.
  //  */
  // static async findById(userId) {
  //   return await Charity.findById(userId);
  // }

  /**
   * retrieve stripeId of charity by id
   *
   * @param {String} charityId - The ID of the charity to retrieve the stripeId.
   * @returns {Promise<String|null>} - The stripeId of the charity if found, or null if not found.
   */
  static async findStripeIdByCharityId(charityId) {
    const charity = await Charity.findById(charityId).select("stripeId");
    return charity ? charity.stripeId : null;
  }

  static async findById(userId) {
    return await Charity.findOne({ userId });
    //.populate("userId", "email avatar introVideo") // Populate user information (email and avatar)
    //.populate("address"); // Populate address details
  }

  /**
   * Updates an existing charity in the database.
   *
   * @param {String} userId - The ID of the charity to update.
   * @param {Object} updatedData - The data to update in the charity document.
   * @returns {Promise<Object|null>} - The updated charity document if found, or null if not found.
   */
  static async update(userId, updates) {
    try {
      const updateFields = {};

      // Dynamically build the update object based on input fields
      if (updates.name !== undefined) {
        updateFields.name = updates.name;
      }
      if (updates.address !== undefined) {
        updateFields.address = updates.address;
      }
      if (updates.region !== undefined) {
        updateFields.region = updates.region;
      }
      if (updates.category !== undefined) {
        updateFields.category = updates.category;
      }
      if (updates.type !== undefined) {
        updateFields.type = updates.type;
      }
      if (updates.taxCode !== undefined) {
        updateFields.taxCode = updates.taxCode;
      }

      // Perform the update
      const updatedCharity = await Charity.findOneAndUpdate(
        { userId },
        { $set: updateFields },
        { new: true } // Return the updated document
      );

      return updatedCharity;
    } catch (err) {
      console.error("Error updating charity fields:", err);
      throw err;
    }

    // return await Charity.findOneAndUpdate({ userId }, updatedData, {
    //   new: true, // Return the updated document
    //   runValidators: true, // Run schema validators on the updated data
    // })
    //.populate("userId", "email avatar introVideo") // Populate user information (email and avatar)
    //.populate("address"); // Populate address details
  }

  /**
   * Deletes a charity from the database.
   *
   * @param {String} userId - The ID of the charity to delete.
   * @returns {Promise<Object|null>} - The deleted charity document if found, or null if not found.
   */
  static async delete(userId) {
    return await Charity.findOneAndDelete({ userId }); // Delete the charity document
  }

  /**
   * Checks if a user exists by their ID.
   *
   * @param {String} userId - The ID of the user to check.
   * @returns {Promise<Object|null>} - The user document if found, or null if not found.
   */
  static async userExists(userId) {
    return await User.findById(userId); // Check if the user exists in the database
  }

  /**
   * Checks if an address exists by its ID.
   *
   * @param {String} addressId - The ID of the address to check.
   * @returns {Promise<Object|null>} - The address document if found, or null if not found.
   */
  static async addressExists(addressId) {
    return await Address.findById(addressId); // Check if the address exists in the database
  }

  /**
   * Fetch charity names by an array of IDs.
   *
   * @param {Array<String>} charityIds - An array of charity IDs.
   * @returns {Promise<Array>} - An array of charity objects containing `_id` and `name`.
   */
  static async getCharityNamesByIds(charityIds) {
    return await Charity.find(
      { _id: { $in: charityIds } },
      { _id: 1, name: 1 } // Select only `_id` and `name` fields
    );
  }

  /**
   * Verify if a charity ID exists.
   *
   * @param {String} charityId - The ID of the charity to verify.
   * @returns {Promise<Boolean>} - True if the charity exists, otherwise false.
   */
  static async verifyCharityExists(charityId) {
    const charity = await Charity.findById(charityId);
    return !!charity;
  }

  /**
   * Fetch IDs of charities whose names contain the specified keyword.
   *
   * @param {String} keyword - The keyword to search for in charity names.
   * @returns {Promise<Array>} - An array of charity IDs.
   */
  // charity.repository.js
  static async findCharitiesByKeyword(keyword) {
    console.log("Searching for charities with keyword:", keyword); // Debug log for input
    const result = await Charity.find({
      name: { $regex: keyword, $options: "i" },
    }).select("_id name");
    console.log("Search results:", result); // Debug log for output
    return result;
  }

  /**
   * Find a charity by its ID.
   *
   * @param {String} charityId - The ID of the charity to find.
   * @returns {Promise<Object|null>} - The charity document if found, or null if not found.
   */
  static async findCharityByCharityId(charityId) {
    return await Charity.findById(charityId);
  }

  static async findUserIdByCharityId(charityId) {
    const charity = await Charity.findById(charityId).select("userId");
    return charity ? charity.userId : null;
  }
}

module.exports = CharityRepository; // Export the repository class for use in other parts of the application
