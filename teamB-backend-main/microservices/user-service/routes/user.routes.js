const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getS3PresignURL,
  getRegistrationTrends,
} = require("../controllers/user.controller");
const { verify } = require("../middleware/authorize");

const router = express.Router();

// Route to create a new user
router.post("/", verify("Normal"), createUser);

// Route to retrieve all users
router.get("/", verify("Admin"), getAllUsers);

// Route to retrieve a user by ID
router.get("/:id", verify("Normal"), getUserById);

// Route to update an existing user by ID
router.put("/:id", verify("Normal"), updateUser);

// Route to delete a user by ID
router.delete("/:id", verify("Admin"), deleteUser);

// Route for upload image and Video
router.post("/presigned-url", verify("Normal"), getS3PresignURL);

// Route to get registration trends for donors or charities
router.get("/registrations/:role/:choice", getRegistrationTrends);

module.exports = router;
