const express = require("express");
const {
  createDonor,
  getDonorById,
  getDonorStripeId,
  updateDonor,
  deleteDonor,
  getAllDonors,
  getEmailByDonorId,
  verifyDonorExists,
  updateDonationStats,
  getGlobalDonorStats,
  getFilteredDonorStats,
  getTopDonors,
  getTopDonorsMonthly,
  getProjectsAndDonationsOfDonor,
} = require("../controllers/donor.controller");
const { verify } = require("../middleware/authorize");

const router = express.Router();

// Route to get global donor statistics
router.get("/global-stats", verify("Admin"), getGlobalDonorStats);

// Route to get filtered donor statistics
router.get("/filtered-stats", verify("Admin"), getFilteredDonorStats);

// Route to get top donors
router.get("/top-donors", verify("Admin"), getTopDonors);

// Route to get top donors monthly
router.get("/top-donors-monthly", verify("Admin"), getTopDonorsMonthly);

// Route to create a new donor
router.post("/", createDonor);

// Route to retrieve all donors
router.get("/", verify("Admin"), getAllDonors);

// Route to retrieve a specific donor by User ID
router.get("/:id", getDonorById);

// Route to retrieve stripeId of donor by ID
router.get("/:id/stripeId", getDonorStripeId);

// Route to update a donor by User ID
router.put("/:id", updateDonor);

// Route to delete a donor by User ID
router.delete("/:id", verify("Admin"), deleteDonor);

// Route to get email by donor ID
router.get("/:id/email", getEmailByDonorId);

// Route to verify if donor ID exists
router.get("/:id/exists", verifyDonorExists);

// Route to update donor statistics
router.post("/:id/update-stats", updateDonationStats);

// Route to get total donated projects and donation count of a donor
router.get("/:id/projects-and-donations", getProjectsAndDonationsOfDonor);

module.exports = router;
