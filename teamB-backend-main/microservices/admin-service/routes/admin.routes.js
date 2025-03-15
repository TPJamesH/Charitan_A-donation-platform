const express = require("express");
const {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
  masterAdminExists,
} = require("../controller/admin.controller");

const router = express.Router();

// Route to create a new admin
router.post("/", createAdmin);

// Route to delete an admin
router.delete("/:adminId", deleteAdmin);

// Route to update an admin
router.put("/:adminId", updateAdmin);

// Route to retrieve all admins
router.get("/", getAllAdmins);

// Route to verify if master admin exists
router.get("/master-admin-exists", masterAdminExists);

module.exports = router;
