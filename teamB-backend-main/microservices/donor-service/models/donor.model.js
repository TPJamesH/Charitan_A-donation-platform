const { mongoose } = require("../db/db"); // Import mongoose instance from the database configuration

/**
 * Donor Schema Definition.
 * This schema defines the structure and constraints for the Donor model in the database.
 */
const donorSchema = new mongoose.Schema(
  {
    /**
     * User ID associated with the donor.
     * References the User model to establish a relationship between a donor and their account.
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
     * First name of the donor.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the first name.
     */
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Last name of the donor.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the last name.
     */
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    hashedStripeId: {
      type: String,
    },

    /**
     * Addresses associated with the donor.
     * Stores an array of ObjectIds referencing the Address model.
     * 
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @ref "Address" - The related Address model.
     * @default An empty array if no addresses are provided.
     */
    address: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Address",
      default: [],
    },

    /**
     * Region where the donor is located.
     * 
     * @type {String}
     * @trim Removes unnecessary whitespace from the region name.
     */
    region: {
      type: String,
      trim: true,
    },

    /**
     * Subscription preferences for the donor.
     * Includes categories and regions of interest for notifications or updates.
     */
    subscription: {
      /**
       * Categories the donor is subscribed to.
       * Represents the donor's areas of interest (e.g., Education, Health).
       * 
       * @type {Array<String>}
       * @default An empty array if no categories are specified.
       */
      category: {
        type: [String],
        default: [],
      },

      /**
       * Regions the donor is subscribed to.
       * Represents the geographic areas of interest for the donor.
       * 
       * @type {Array<String>}
       * @default An empty array if no regions are specified.
       */
      region: {
        type: [String],
        default: [],
      },
    },

    /**
     * Donation statistics for the donor.
     * Tracks metrics like total amount donated and the number of projects supported.
     */
    donationStat: {
      /**
       * Total amount donated by the donor.
       * 
       * @type {Number}
       * @default 0 if no donations have been made.
       */
      totalDonation: {
        type: Number,
        default: 0,
      },

      monthlyDonated: {
        type: Number,
        default: 0,
      },

      /**
       * Number of projects the donor has contributed to.
       * 
       * @type {Number}
       * @default 0 if no contributions have been made.
       */
      projectsDonated: {
        type: Number,
        default: 0,
      },
    },

    /**
     * Stripe ID for the donor.
     * Represents the unique ID assigned to the donor in Stripe.
     *
     * @type {String}
     */
    stripeId: {
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
 * Donor Model.
 * Represents the Donor collection in the database.
 * 
 * @model Donor
 * @collection donors
 */
const Donor = mongoose.model("Donor", donorSchema, "donors");

module.exports = Donor; // Export the Donor model for use in other parts of the application
