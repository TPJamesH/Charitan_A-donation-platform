const UserRepository = require('../repository/user.repository.js');

/**
 * Service layer for managing users.
 * Encapsulates business logic and handles interaction with the UserRepository.
 */
class UserService {
  /**
   * Creates a new user.
   * 
   * @param {Object} userData - The data for the new user to be created.
   * @returns {Promise<Object>} The newly created user document.
   * @throws {Error} If user creation fails.
   */
  static async create(userData) {
    try {
      // Additional business logic, e.g., input validation, could be added here
      return await UserRepository.create(userData);
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by their username.
   * 
   * @param {string} username - The username of the user to retrieve.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async findByUsername(username) {
    return await UserRepository.findByUsername(username);
  }

  /**
   * Retrieves a user by their email.
   * 
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async findByEmail(email) {
    return await UserRepository.findByEmail(email);
  }

  /**
   * Retrieves a user by their unique ID.
   * 
   * @param {string} userId - The unique identifier of the user to retrieve.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async findById(userId) {
    return await UserRepository.findById(userId);
  }

  /**
   * Retrieves a user by their refresh token.
   * 
   * @param {string} refreshToken - The refresh token of the user to retrieve.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  static async findByRefreshToken(refreshToken) {
    return await UserRepository.findByRefreshToken(refreshToken);
  }

  /**
   * Updates a user's data.
   * 
   * @param {string} userId - The unique identifier of the user to update.
   * @param {Object} updatedData - The updated data for the user.
   * @returns {Promise<Object|null>} The updated user document if found, otherwise null.
   * @throws {Error} If the update fails.
   */
  static async update(userId, updatedData) {
    try {
      return await UserRepository.update(userId, updatedData);
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
}

module.exports = UserService;