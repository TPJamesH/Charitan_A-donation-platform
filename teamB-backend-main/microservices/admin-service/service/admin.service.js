const AdminRepository = require("../repository/admin.repository");
const InternalAdminDTO = require("../dtos/admin.internal.dto");
const ExternalAdminDTO = require("../dtos/admin.external.dto");

/**
 * Service layer for managing admin-related operations.
 */
class AdminService {
  /**
   * Creates a new admin.
   *
   * @param {Object} adminData 
   * @returns {Promise<ExternalAdminDTO>} 
   */
  static async createAdmin(adminData) {
    const masterAdminExists = await AdminRepository.masterAdminExists();

    if (adminData.permissionLevel === "master admin" && masterAdminExists) {
      throw new Error(
        "A master admin already exists. Only one master admin is allowed."
      );
    }

    const createdAdmin = await AdminRepository.createAdmin(adminData);
    return new ExternalAdminDTO(createdAdmin.toObject());
  }

  /**
   * Deletes an admin by ID.
   *
   * @param {String} adminId 
   * @returns {Promise<ExternalAdminDTO>} 
   */
  static async deleteAdmin(adminId) {
    const deletedAdmin = await AdminRepository.deleteAdmin(adminId);
    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }
    return new ExternalAdminDTO(deletedAdmin.toObject());
  }

  /**
  * Retrieves all admins.
  *
  * @param {Object} filter
  * @returns {Promise<Array<ExternalAdminDTO>>}
  */
  static async getAllAdmins() {
    const admins = await AdminRepository.findAll();

    return admins.map((admin) => admin.toObject());
  }

  /**
   * Updates an admin by ID.
   *
   * @param {String} adminId 
   * @param {Object} updateData 
   * @returns {Promise<ExternalAdminDTO|null>} 
   */
  static async updateAdmin(adminId, updateData) {
    const updatedAdmin = await AdminRepository.updateAdmin(adminId, updateData);
    if (!updatedAdmin) {
      return null;
    }
    return new ExternalAdminDTO(updatedAdmin.toObject());
  }


  /**
   * Checks if a master admin exists.
   *
   * @returns {Promise<Boolean>} 
   */
  static async masterAdminExists() {
    return await AdminRepository.masterAdminExists();
  }
}

module.exports = AdminService;
