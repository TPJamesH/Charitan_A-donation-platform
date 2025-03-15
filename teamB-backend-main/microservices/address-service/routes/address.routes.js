const express = require("express");
const {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");
const router = express.Router();

// Route to create a new address
router.post("/", createAddress);

// Route to retrieve all addresses
router.get("/", getAllAddresses);

// Route to retrieve a specific address by ID
router.get("/:id", getAddressById);

// Route to update an existing address by ID
router.put("/:id", updateAddress);

// Route to delete an address by ID
router.delete("/:id", deleteAddress);

module.exports = router;