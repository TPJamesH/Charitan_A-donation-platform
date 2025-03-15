const UserRepository = require("../repository/user.repository");
const { getObjectPresignUrl } = require("../utils/s3client.js");
const UserInternalDTO = require("../dtos/user.internal.dto");
const UserExternalDTO = require("../dtos/user.external.dto");

const topics = require("../broker/topics");
const { publish } = require("../broker/producer");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Service layer for managing users.
 * Handles business logic and delegates database operations to the repository layer.
 */
class UserService {
  /**
   * Creates a new user.
   * Delegates user creation to the repository layer.
   *
   * @param {Object} userData - Data for the new user.
   * @returns {Promise<Object>} - The created user.
   */
  static async createUser(userData) {
    const user = await UserRepository.create(userData); // Create user in DB
    return new UserInternalDTO(user.toObject());
  }

  /**
   * Retrieves all users.
   * Delegates retrieval to the repository layer.
   *
   * @returns {Promise<Array>} - List of all users.
   */
  static async getAllUsers() {
    let users = await UserRepository.findAll();
    // Map over users and fetch pre-signed URLs for each user
    const usersWithPresignedUrls = await Promise.all(
      users.map(async (user) => {
        // Convert Mongoose document to plain JavaScript object
        const plainUser = user.toObject();
        const avatarUrl = await getObjectPresignUrl(plainUser.avatar);
        const introVideoUrl = await getObjectPresignUrl(plainUser.introVideo);
        return {
          ...plainUser,
          avatar: avatarUrl,
          introVideo: introVideoUrl,
        };
      })
    );

    return usersWithPresignedUrls;
  }

  /**
   * Retrieves a user by ID.
   * Validates existence and returns the user if found.
   *
   * @param {String} userId - ID of the user to retrieve.
   * @throws {Error} - If the user is not found.
   * @returns {Promise<Object>} - The retrieved user.
   */
  static async getUserById(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.avatar) {
      const avatarUrl = await getObjectPresignUrl(user.avatar);
      user.avatar = avatarUrl;
    }
    if (user.introVideo) {
      const introVideoUrl = await getObjectPresignUrl(user.introVideo);
      user.introVideo = introVideoUrl;
    }
    return user;
  }

  /**
   * Updates an existing user by ID.
   * Validates existence and updates the user with provided data.
   *
   * @param {String} userId - ID of the user to update.
   * @param {Object} updatedData - Data to update the user.
   * @throws {Error} - If the user is not found.
   * @returns {Promise<Object>} - The updated user.
   */
  static async updateUser(userId, updatedData) {
    const updatedUser = await UserRepository.update(userId, updatedData);
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  /**
   * Deletes a user by ID.
   * Validates existence and removes the user.
   *
   * @param {String} userId - ID of the user to delete.
   * @throws {Error} - If the user is not found.
   * @returns {Promise<Object>} - The deleted user.
   */
  static async deleteUser(userId) {
    const deletedUser = await UserRepository.delete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }

    // Return as internal DTO for consistent data handling
    return new UserInternalDTO(deletedUser.toObject());
  }

  /**
   * Get registration trends for donors or charities.
   *
   * @param {String} role - The role to filter by (Donor/Charity).
   * @param {String} choice - The timeframe to filter by (Year/Month/Week).
   * @returns {Promise<Object>} - The registration trends data.
   */
  static async getRegistrationTrends(role, choice) {
    const now = new Date();
    let startDate = new Date();

    switch (choice) {
      case "Year":
        startDate.setDate(startDate.getDate() - 365);
        break;
      case "Month":
        startDate.setDate(startDate.getDate() - 31);
        break;
      case "Week":
        startDate.setDate(startDate.getDate() - 7);
        break;
      default:
        throw new Error(
          "Invalid choice. Valid options are Year, Month, or Week."
        );
    }

    return await UserRepository.getRegistrationTrends(role, startDate, now);
  }

  /**
   * Handles user validation requests.
   *
   * @param {Object} message - The validation request message.
   * @param {String} topic - The Kafka topic.
   * @throws {Error} - If the user is not found.
   * @returns {Promise<Object>} - The validation response.
   * */
  static async handleUserValidation(message, topic) {
    const { userId, correlationId } = message;

    console.log(
      `[UserService] Validation request for userId "${userId}" from topic "${topic}" with correlationId "${correlationId}"`
    );

    let responseTopic;
    if (topic === topics.DONOR_USER_VALIDATE) {
      responseTopic = topics.DONOR_VALIDATION_RESULT;
    } else if (topic === topics.CHARITY_USER_VALIDATE) {
      responseTopic = topics.CHARITY_VALIDATION_RESULT;
    } else {
      console.error(`[UserService] Unknown topic "${topic}"`);
      return;
    }

    try {
      // Validate userId format
      if (!userId || !ObjectId.isValid(userId)) {
        console.error(`[UserService] Invalid userId format "${userId}"`);
        await publish({
          topic: responseTopic,
          event: "user.validation.error",
          message: {
            correlationId,
            userId,
            isValid: false,
          },
        });
        return;
      }

      // Validate user existence in the database
      const userExists = await UserRepository.findById(new ObjectId(userId));
      console.log(
        `[UserService] User validation check for userId "${userId}":`,
        userExists
      );

      const isValid = !!userExists;

      // Publish validation result
      console.log(
        `[UserService] Publishing to topic "${responseTopic}" with message:`,
        {
          correlationId,
          userId,
          isValid,
        }
      );
      await publish({
        topic: responseTopic,
        event: "user.validation",
        message: {
          correlationId,
          userId,
          isValid,
        },
      });

      console.log(
        `[UserService] Published validation result for userId "${userId}" to topic "${responseTopic}" with correlationId "${correlationId}"`
      );
    } catch (error) {
      console.error(
        `[UserService] Database error during validation for userId "${userId}":`,
        error.message
      );

      await publish({
        topic: responseTopic,
        event: "user.validation.error",
        message: {
          correlationId,
          userId,
          isValid: false,
        },
      });
    }
  }

  /**
   * Fetches a user's email and publishes the response.
   *
   * @param {Object} message - The message payload.
   */
  static async handleFetchEmail(message) {
    const { userId, correlationId } = message;

    console.log(
      `[UserService] Email request for userId "${userId}" with correlationId "${correlationId}"`
    );

    try {
      const user = await UserRepository.findById(userId);
      const email = user?.email || null;

      // Publish the email response
      await publish({
        topic: topics.GET_USER_EMAIL_RESULT,
        event: "email_response",
        message: {
          correlationId,
          userId,
          email,
        },
      });

      console.log(
        `[UserService] Published email response for userId "${userId}" with correlationId "${correlationId}"`
      );
    } catch (error) {
      console.error(
        `[UserService] Failed to fetch email for userId "${userId}":`,
        error.message
      );

      // Publish an error response
      await publish({
        topic: topics.GET_USER_EMAIL_RESULT,
        event: "email_error",
        message: {
          correlationId,
          userId,
          email: null,
        },
      });
    }
  }

  /**
   * Retrieves the top monthly users with avatars and publishes the result.
   *
   * @param {Object} message - The message payload.
   */
  static async handleGetTopMonthlyUsers(message) {
    const { userList, correlationId } = message;

    console.log(
      `[UserService] Top monthly users request with correlationId "${correlationId}"`
    );

    try {
      const userTopMonthlyWithAvatar = await Promise.all(
        userList.map(async (user) => {
          const userData = await UserRepository.findById(user.userId);
          return {
            ...user,
            avatar: userData?.avatar || null,
          };
        })
      );

      // Publish the response
      await publish({
        topic: topics.RESULT_TOP_MONTHLY_USER,
        event: "monthly_user_response",
        message: {
          correlationId,
          userTopMonthlyWithAvatar,
        },
      });

      console.log(
        `[UserService] Published top monthly users for correlationId "${correlationId}"`
      );
    } catch (error) {
      console.error(
        `[UserService] Failed to fetch top monthly users:`,
        error.message
      );
    }
  }
}

module.exports = UserService;
