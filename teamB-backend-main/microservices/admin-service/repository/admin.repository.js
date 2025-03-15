// const Admin = require("/user-service/models/user.model");
const Admin = require("../models/user.model");

/**
 * Repository for managing admin-related database operations.
 */
class AdminRepository {
  /**
   * Creates a new admin.
   *
   * @param {Object} adminData
   * @returns {Promise<Object>} 
   */
  static async createAdmin(adminData) {
    const admin = new Admin(adminData);
    return await admin.save();
  }

  /**
   * Deletes an admin by ID.
   *
   * @param {String} adminId 
   * @returns {Promise<Object|null>} 
   * @throws {Error} 
   */
  static async deleteAdmin(adminId) {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }
    return deletedAdmin;
  }

  /**
   * Retrieves an admin by email.
   *
   * @param {String} email
   * @returns {Promise<Object|null>} 
   */
  static async getAdminByEmail(email) {
    return await Admin.findOne({ email });
  }

  /**
   * Retrieves all admins based on filters.
   *
   * @param {Object} filter
   * @returns {Promise<Array>} 
   */
  static async findAll() {
    return await Admin.find({ role: "Admin" });
  }

  /**
   * Updates an admin by ID.
   *
   * @param {String} adminId 
   * @param {Object} updateData 
   * @returns {Promise<Object|null>} 
   */
  static async updateAdmin(adminId, updateData) {
    return await Admin.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true,
    });
  }


  /**
   * Checks if a master admin exists in the system.
   *
   * @returns {Promise<Boolean>} 
   */
  static async masterAdminExists() {
    const masterAdmin = await Admin.findOne({
      permissionLevel: "master admin",
    });
    return !!masterAdmin;
  }
}

module.exports = AdminRepository;
