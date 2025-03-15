const AddressRepository = require("../repository/address.repository");
const AddressDTO = require("../dtos/address.dto");

/**
 * Service layer for managing addresses.
 * Handles business logic and delegates data operations to the repository layer.
 */
class AddressService {
  /**
   * Creates a new address.
   *
   * @param {Object} addressData - Data for the new address.
   * @returns {Promise<Object>} - The created address.
   */
  static async createAddress(addressData) {
    const address = await AddressRepository.create(addressData);
    return new AddressDTO(address.toObject());
  }

  /**
   * Retrieves all addresses.
   *
   * @returns {Promise<Array>} - List of all addresses.
   */
  static async getAllAddresses() {
    const addresses = await AddressRepository.findAll();
    // return addresses.map((address) => new AddressDTO(address.toObject()));
    return addresses;
  }

  /**
   * Retrieves an address by its ID.
   *
   * @param {String} addressId - ID of the address to retrieve.
   * @returns {Promise<Object>} - The address if found.
   * @throws {Error} - If the address is not found.
   */
  static async getAddressById(addressId) {
    const address = await AddressRepository.findById(addressId);
    if (!address) {
      throw new Error("Address not found");
    }
    return new AddressDTO(address.toObject());
  }

  /**
   * Updates an existing address by its ID.
   *
   * @param {String} addressId - ID of the address to update.
   * @param {Object} updatedData - Data to update the address with.
   * @returns {Promise<Object>} - The updated address.
   * @throws {Error} - If the address is not found.
   */
  static async updateAddress(addressId, updatedData) {
    const updatedAddress = await AddressRepository.update(
      addressId,
      updatedData
    );
    if (!updatedAddress) {
      throw new Error("Address not found");
    }
    return new AddressDTO(updatedAddress.toObject());
  }

  /**
   * Deletes an address by its ID.
   *
   * @param {String} addressId - ID of the address to delete.
   * @returns {Promise<Object>} - The deleted address.
   * @throws {Error} - If the address is not found.
   */
  static async deleteAddress(addressId) {
    const deletedAddress = await AddressRepository.delete(addressId);
    if (!deletedAddress) {
      throw new Error("Address not found");
    }
    return new AddressDTO(deletedAddress.toObject());
  }
}

module.exports = AddressService;
