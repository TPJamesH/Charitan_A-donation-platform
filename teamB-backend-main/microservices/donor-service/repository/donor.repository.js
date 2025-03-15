const Donor = require("../models/donor.model"); // Donor schema for MongoDB
const User = require("../models/user.model"); // User schema for MongoDB
const Address = require("/address-service/models/address.model"); // Address schema for MongoDB

/**
 * Repository class for interacting with the Donor model.
 * Encapsulates all database queries related to donors.
 */
class DonorRepository {
  /**
   * Create a new donor record in the database.
   *
   * @param {Object} donorData - Data for the new donor.
   * @returns {Object} - The created donor record.
   */
  static async create(donorData) {
    console.log(`[DonorRepository] Saving donor data:`, donorData);
    const donor = new Donor(donorData);
    return await donor.save();
  }

  /**
   * Fetch all donors from the database.
   *
   * @returns {Array} - A list of all donors with populated references.
   */
  static async findAll() {
    return await Donor.find(); //.populate("userId", "email avatar").populate("address");
  }

  /**
   * Fetch a donor by their ID.
   *
   * @param {String} userId - The user ID of the donor to fetch.
   * @returns {Object} - The donor record with populated references, or null if not found.
   */
  static async findById(userId) {
    return await Donor.findOne({ userId }); //.populate("userId", "email avatar").populate("address");
  }

  /**
   * Update an existing donor record by their ID.
   *
   * @param {String} userId - The user ID of the donor to update.
   * @param {Object} updatedData - The updated donor data.
   * @returns {Object} - The updated donor record, or null if not found.
   */
  static async update(userId, updates) {
    const updateFields = {};

    // Handle updates for `donationStat`
    if (updates.donationStat) {
      updateFields["donationStat.totalDonation"] =
        updates.donationStat.totalDonation ?? 0;
      updateFields["donationStat.monthlyDonated"] =
        updates.donationStat.monthlyDonated ?? 0;
      updateFields["donationStat.projectsDonated"] =
        updates.donationStat.projectsDonated ?? 0;
    }

    // Other fields
    if (updates.firstName !== undefined) {
      updateFields.firstName = updates.firstName;
    }
    if (updates.lastName !== undefined) {
      updateFields.lastName = updates.lastName;
    }
    if (updates.address !== undefined) {
      updateFields.address = updates.address;
    }
    if (updates.subscriptionCategory !== undefined) {
      updateFields["subscription.category"] = updates.subscriptionCategory;
    }
    if (updates.subscriptionRegion !== undefined) {
      updateFields["subscription.region"] = updates.subscriptionRegion;
    }
    if (updates.region !== undefined) {
      updateFields.region = updates.region;
    }

    // Perform the update
    return await Donor.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true }
    );
  }

  /**
   * Delete a donor record by their ID.
   *
   * @param {String} userId - The user ID of the donor to delete.
   * @returns {Object} - The deleted donor record, or null if not found.
   */
  static async delete(userId) {
    return await Donor.findOneAndDelete({ userId });
  }

  /**
   * Check if a user exists by their ID.
   *
   * @param {String} userId - The user ID of the user to check.
   * @returns {Object} - The user record, or null if not found.
   */
  static async userExists(userId) {
    return await User.findById(userId);
  }

  /**
   * Check if an address exists by its ID.
   *
   * @param {String} addressId - The ID of the address to check.
   * @returns {Object} - The address record, or null if not found.
   */
  static async addressExists(addressId) {
    return await Address.findById(addressId);
  }

  /**
   * Update donation statistics for a donor.
   *
   * @param {String} donorId - The ID of the donor to update.
   * @param {Object} updatedData - Updated donation statistics.
   * @returns {Object} - The updated donor record.
   */
  static async updateDonationStats(donorId, updatedData) {
    return await Donor.findByIdAndUpdate(donorId, updatedData, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = DonorRepository; // Export the repository class for use in other parts of the application
