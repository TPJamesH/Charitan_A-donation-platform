const { mongoose } = require("../db/db");

/**
 * Admin Schema Definition
 * Defines the structure for admin accounts in the system.
 */
const adminSchema = new mongoose.Schema(
  {
    /**
     * Email of the admin.
     * Must be unique and follow a valid email format.
     */
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },

    /**
     * Hashed password of the admin.
     * Stored securely and required for authentication.
     */
    hashedPassword: {
      type: String,
      required: [true, "password is required"],
    },

    /**
     * Date when the admin account was created.
     * Automatically set upon creation.
     */
    createdAt: {
      type: Date,
      default: Date.now,
    },

    /**
     * Permission level of the admin.
     * Determines whether the admin is a "master admin" or "normal admin".
     */
    permissionLevel: {
      type: String,
      enum: ["master admin", "normal admin"],
      default: "normal admin", // Default to "normal admin"
      required: true,
    },
  },
  {
    /**
     * Adds `createdAt` and `updatedAt` timestamps automatically.
     */
    timestamps: true,
  }
);

/**
 * Default Master Admin Setup
 * Ensure there is always at least one master admin in the system.
 */
adminSchema.pre("save", async function (next) {
  if (this.permissionLevel === "master admin") {
    const masterAdminExists = await mongoose.models.Admin.findOne({
      permissionLevel: "master admin",
    });

    if (masterAdminExists && this.isNew) {
      throw new Error(
        "A master admin already exists. Only one master admin is allowed."
      );
    }
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
