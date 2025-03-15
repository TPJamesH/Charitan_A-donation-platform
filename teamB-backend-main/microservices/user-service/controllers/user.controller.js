const UserService = require("../service/user.service");
const UserExternalDTO = require("../dtos/user.external.dto");
const { s3Client } = require("../utils/s3client.js");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
/**
 * Creates a new user.
 * Handles input from the client and delegates the creation logic to the service layer.
 *
 * @param {Object} req - Request object containing user data in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await UserService.createUser(userData);

    // Convert to external DTO for the response
    const userDTO = new UserExternalDTO(newUser);
    res
      .status(201)
      .json({ message: "User created successfully", user: userDTO });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all users.
 * Calls the service layer to fetch and return a list of all users.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a specific user by ID.
 * Calls the service layer to fetch and return user details by ID.
 *
 * @param {Object} req - Request object containing user ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }

    const user = await UserService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);

    res
      .status(error.message === "User not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Updates an existing user by ID.
 * Delegates the update operation to the service layer and responds with the updated user.
 *
 * @param {Object} req - Request object containing user ID in the URL parameters and updated data in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }
    const updatedData = req.body;
    const updatedUser = await UserService.updateUser(userId, updatedData);
    //res.status(200).json({ message: "User updated successfully", user: updatedUser });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res
      .status(error.message === "User not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Deletes a user by ID.
 * Delegates the deletion to the service layer and responds with a success message.
 *
 * @param {Object} req - Request object containing user ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }

    await UserService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(error.message === "User not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

// for upload image and video
const getS3PresignURL = async (req, res) => {
  const { fileName, fileType } = req.body;
  console.log(fileName);
  const params = {
    Bucket: process.env.BUCKETNAME,
    Key: fileName, // File name in the S3 bucket
    ContentType: fileType,
  };

  try {
    // Generate the pre-signed URL
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // 60 seconds

    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
Get registration trends for donors or charities.
*/
const getRegistrationTrends = async (req, res) => {
  try {
    const { role, choice } = req.params; // Role: Donor/Charity, Choice: Year/Month/Week
    const data = await UserService.getRegistrationTrends(role, choice);
    res.status(200).json(data);
  } catch (error) {
    console.error(
      `[UserController] Error fetching ${role} registration trends: ${error.message}`
    );
    res
      .status(500)
      .json({ error: `Failed to fetch ${role} registration trends` });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getS3PresignURL,
  getRegistrationTrends,
};
