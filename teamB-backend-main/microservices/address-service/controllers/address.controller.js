const AddressService = require("../service/address.service");

/**
 * Creates a new address.
 * Delegates the creation process to AddressService.
 *
 * @param {Object} req - Express request object containing address data in req.body.
 * @param {Object} res - Express response object used to send the response.
 */
const createAddress = async (req, res) => {
  try {
    const addressData = req.body;
    const newAddress = await AddressService.createAddress(addressData);
    res.status(201).json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.error("Error creating address:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all addresses.
 * Fetches the list of addresses from AddressService.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object used to send the response.
 */
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await AddressService.getAllAddresses();
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves an address by ID.
 * Fetches the address details from AddressService using the provided ID.
 *
 * @param {Object} req - Express request object containing address ID in req.params.id.
 * @param {Object} res - Express response object used to send the response.
 */
const getAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await AddressService.getAddressById(addressId);
    res.status(200).json(address);
  } catch (error) {
    console.error("Error fetching address:", error.message);
    res.status(error.message === "Address not found" ? 404 : 500).json({ error: error.message });
  }
};

/**
 * Updates an existing address.
 * Delegates the update process to AddressService.
 *
 * @param {Object} req - Express request object containing address ID in req.params.id and update data in req.body.
 * @param {Object} res - Express response object used to send the response.
 */
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updatedData = req.body;
    const updatedAddress = await AddressService.updateAddress(addressId, updatedData);
    res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error.message);
    res.status(error.message === "Address not found" ? 404 : 500).json({ error: error.message });
  }
};

/**
 * Deletes an address by ID.
 * Delegates the deletion process to AddressService.
 *
 * @param {Object} req - Express request object containing address ID in req.params.id.
 * @param {Object} res - Express response object used to send the response.
 */
const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    await AddressService.deleteAddress(addressId);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error.message);
    res.status(error.message === "Address not found" ? 404 : 500).json({ error: error.message });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};