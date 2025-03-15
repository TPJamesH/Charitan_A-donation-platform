const Address = require("../models/address.model");

/**
 * Repository for performing CRUD operations on Address documents.
 */
class AddressRepository {
  /**
   * Creates a new address record.
   *
   * @param {Object} addressData - Data for the new address.
   * @returns {Promise<Object>} - The created address document.
   */
  static async create(addressData) {
    const address = new Address(addressData);
    return await address.save();
  }

  /**
   * Retrieves all address records.
   *
   * @returns {Promise<Array>} - Array of address documents.
   */
  static async findAll() {
    return await Address.find();
  }

  /**
   * Retrieves an address by its ID.
   *
   * @param {String} addressId - Unique identifier of the address.
   * @returns {Promise<Object|null>} - The address document, or null if not found.
   */
  static async findById(addressId) {
    return await Address.findById(addressId);
  }

  /**
   * Updates an existing address record.
   *
   * @param {String} addressId - Unique identifier of the address.
   * @param {Object} updatedData - Data to update the address with.
   * @returns {Promise<Object|null>} - The updated address document, or null if not found.
   */
  static async update(addressId, updatedData) {
    return await Address.findByIdAndUpdate(addressId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on the updated fields
    });
  }

  /**
   * Deletes an address record.
   *
   * @param {String} addressId - Unique identifier of the address.
   * @returns {Promise<Object|null>} - The deleted address document, or null if not found.
   */
  static async delete(addressId) {
    return await Address.findByIdAndDelete(addressId);
  }
}

module.exports = AddressRepository;