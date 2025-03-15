const express = require("express");
const {
  createCharity,
  getAllCharities,
  getCharityById,
  getCharityStripeId,
  updateCharity,
  deleteCharity,
  getCharityNamesByIds,
  verifyCharityExists,
  getCharitiesByKeyword,
  getCharityByCharityId,
  getUserIdByCharityId,
} = require("../controllers/charity.controller");
const { verify } = require("../middleware/authorize");

const router = express.Router();

// Route to fetch charity IDs by keyword
router.get("/search", getCharitiesByKeyword);

// Route to create a new charity
router.post("/", createCharity);

// Route to retrieve all charities
router.get("/", verify("Admin"), getAllCharities);

// Route to retrieve a specific charity by User ID
router.get("/:id", verify("Admin"), getCharityById);

// Route to retrieve stripeId of charity by ID
router.get("/:id/stripeId", getCharityStripeId);

// Route to update an existing charity by User ID
router.put("/:id", updateCharity);

// Route to delete a charity by User ID
router.delete("/:id", verify("Admin"), deleteCharity);

// Route to get charity names by IDs
router.post("/names", getCharityNamesByIds);

// Route to verify if a charity ID exists
router.get("/:id/exists", verify("Admin"), verifyCharityExists);

// Route to get charity by charityId
router.get("/by-charity-id/:charityId", verify("Admin"), getCharityByCharityId);

// Route to get userId by charityId
router.get("/:charityId/userId", verify("Admin"), getUserIdByCharityId);

module.exports = router;
