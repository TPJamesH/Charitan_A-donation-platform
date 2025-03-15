const User = require("../models/user.model"); // Import the User model for database interactions

/**
 * Repository class for interacting with the User model.
 * Encapsulates all database queries related to users.
 */
class UserRepository {
  /**
   * Creates a new user in the database.
   *
   * @param {Object} userData - The data for the new user to be created.
   * @returns {Promise<Object>} The newly created user document.
   */
  static async create(userData) {
    const user = new User(userData); // Create a new User instance with the provided data
    return await user.save(); // Save the user document to the database
  }

  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<Array>} An array of all user documents.
   */
  static async findAll() {
    return await User.find({}); // Fetch all user documents
  }

  /**
   * Retrieves a user by their unique ID.
   *
   * @param {string} userId - The unique identifier of the user to retrieve.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async findById(userId) {
    return await User.findById(userId); // Fetch a user document by its ID
  }

  /**
   * Updates an existing user in the database.
   *
   * @param {string} userId - The unique identifier of the user to update.
   * @param {Object} updatedData - The data to update in the user document.
   * @returns {Promise<Object|null>} The updated user document if found, otherwise null.
   */
  static async update(userId, updatedData) {
    return await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied during the update
    });
  }

  /**
   * Deletes a user from the database by their unique ID.
   *
   * @param {string} userId - The unique identifier of the user to delete.
   * @returns {Promise<Object|null>} The deleted user document if found, otherwise null.
   */
  static async delete(userId) {
    return await User.findByIdAndDelete(userId); // Delete a user document by its ID
  }

  /**
   * Get registration trends for a specific role starting from a given date.
   *
   * @param {String} role - The role to filter by (Donor/Charity).
   * @param {Date} startDate - The start date for filtering registrations.
   * @returns {Promise<Object>} - Count of registrations grouped by role.
   */
  static async getRegistrationTrends(role, startDate, now) {
    return await User.aggregate([
      { $match: { role, createdAt: { $gte: startDate, $lt: now } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", count: 1 } },
    ]);
  }
}

module.exports = UserRepository; // Export the repository class for use in other parts of the application
