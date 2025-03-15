//const User = require("../../../shared/models/auth.model");
const Authentication = require("../models/user.model");
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
    const user = new Authentication(userData); // Create a new User instance with the provided data
    return await user.save(); // Save the user document to the database
  }

  /**
 * Retrieves a user by their unique ID.
 * 
 * @param {string} userId - The unique identifier of the user to retrieve.
 * @returns {Promise<Object|null>} The user document if found, otherwise null.
 */
  static async findByUsername(username) {
    return await Authentication.findOne({ username }); // Fetch a user document by its username
  }

  static async findByEmail(email) {
    return await Authentication.findOne({ email }); // Fetch a user document by its email
  }
  /**
   * Retrieves a user by their unique ID.
   * 
   * @param {string} userId - The unique identifier of the user to retrieve.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async findById(userId) {
    return await Authentication.findOne({ _id: userId }); // Fetch a user document by its ID
  }

  static async findByRefreshToken(refreshToken) {
    return await Authentication.findOne({ refreshToken }); // Fetch a user document by its ID
  }

  /**
   * Retrieves a user by their unique ID.
   * 
   * @param {string} userId - The unique identifier of the user to retrieve.
   * @param {string} updatedData - desired updated data.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async update(userId, updatedData) {
    return await Authentication.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });
  }
}
module.exports = UserRepository; // Export the repository class for use in other parts of the application