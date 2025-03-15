const AdminService = require("../service/admin.service");

/**
 * Creates a new admin.
 * Handles the HTTP request and response for creating an admin.
 *
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const createAdmin = async (req, res) => {
  try {
    const newAdmin = await AdminService.createAdmin(req.body);
    return res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error creating admin:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Unable to create admin" });
  }
};

/**
 * Deletes an admin by ID.
 * Handles the HTTP request and response for deleting an admin.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    await AdminService.deleteAdmin(adminId);
    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Unable to delete admin" });
  }
};

/**
 * Retrieves all admins.
 *
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an admin by ID.
 * Handles the HTTP request and response for updating an admin.
 *
 * @param {Object} req 
 * @param {Object} res
 * @returns {Promise<void>}
 */
const updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const updateData = req.body;

    const updatedAdmin = await AdminService.updateAdmin(adminId, updateData);
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating admin:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Unable to update admin" });
  }
};

/**
 * Checks if a master admin exists.
 *
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const masterAdminExists = async (req, res) => {
  try {
    const exists = await AdminService.masterAdminExists();
    return res.status(200).json({ masterAdminExists: exists });
  } catch (error) {
    console.error("Error checking master admin existence:", error.message);
    return res.status(500).json({
      error: error.message || "Unable to check master admin existence",
    });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
  masterAdminExists,
};
