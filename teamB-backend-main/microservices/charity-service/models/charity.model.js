const { mongoose } = require("../db/db"); // Import mongoose instance from the database configuration

/**
 * Charity Schema Definition.
 * This schema defines the structure and constraints for the Charity model in the database.
 */
const charitySchema = new mongoose.Schema(
  {
    /**
     * User ID associated with the charity.
     * References the User model to establish a relationship between a charity and its owner.
     *
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref "User" - The related User model.
     * @required This field is mandatory.
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Name of the charity.
     * Represents the official name or title of the charity entity.
     *
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the name.
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Address associated with the charity.
     * References the Address model to establish a relationship between a charity and its address.
     *
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref "Address" - The related Address model.
     * @default An empty string if no address is provided.
     */
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    /**
     * Regions the charity operates in.
     * Stores an array of strings representing regions (e.g., countries, states).
     *
     * @type {Array<String>}
     * @default An empty array if no regions are specified.
     */
    region: {
      type: [String],
      default: [],
    },

    /**
     * Category of the charity's activities.
     * Represents the primary focus area of the charity (e.g., Food, Health, Education).
     *
     * @type {String}
     * @enum Specifies a list of valid categories.
     * @default "Other" if no category is provided.
     */
    category: {
      type: [String],
      enum: [
        "Food",
        "Health",
        "Education",
        "Environment",
        "Religion",
        "Humanitarian",
        "Housing",
        "Other",
      ],
      default: [],
    },

    /**
     * Type of the charity.
     * Indicates the organizational type of the charity (e.g., Person, Company, Nonprofit Organization).
     *
     * @type {String}
     * @enum Specifies a list of valid types.
     * @required This field is mandatory.
     */
    type: {
      type: String,
      enum: ["Person", "Company", "Non-profit Organization"],
      required: true,
    },

    /**
     * Tax code associated with the charity.
     * Represents the tax identification code for the charity.
     *
     * @type {String}
     * @trim Removes unnecessary whitespace from the tax code.
     */
    taxCode: {
      type: String,
      trim: true,
    },

    /**
     * Stripe ID for the charity.
     * Represents the unique ID assigned to the charity in Stripe.
     *
     * @type {String}
     */
    hashedStripeId: {
      type: String,
    },
  },
  {
    /**
     * Timestamps.
     * Automatically adds `createdAt` and `updatedAt` fields to the schema.
     */
    timestamps: true,
  }
);

/**
 * Charity Model.
 * Represents the Charity collection in the database.
 *
 * @model Charity
 * @collection charities
 */
const Charity = mongoose.model("Charity", charitySchema, "charities");

module.exports = Charity; // Export the Charity model for use in other parts of the application
