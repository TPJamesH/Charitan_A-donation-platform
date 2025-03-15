const { mongoose } = require("../db/db"); // Import mongoose instance from the database configuration

/**
 * Address Schema for MongoDB.
 * Defines the structure and validation rules for address documents in the database.
 */
const addressSchema = new mongoose.Schema(
  {
    /**
     * Street information for the address.
     * Represents the street or road name and number.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the input.
     */
    street: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * City information for the address.
     * Represents the name of the city where the address is located.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the input.
     */
    city: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * State or province information for the address.
     * Represents the state or province where the address is located.
     * 
     * @type {String}
     * @required This field is optional.
     * @trim Removes unnecessary whitespace from the input.
     */
    state: {
      type: String,
      trim: true,
    },

    /**
     * Zip code or postal code for the address.
     * Represents the postal or zip code for the address.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the input.
     */
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Country information for the address.
     * Represents the name of the country where the address is located.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the input.
     */
    country: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Continent information for the address.
     * Represents the continent where the address is located.
     * 
     * @type {String}
     * @required This field is mandatory.
     * @trim Removes unnecessary whitespace from the input.
     * @enum Restricts input to valid continent names.
     */
    continent: {
      type: String,
      required: true,
      trim: true,
      enum: ["Africa", "Asia", "Antarctica", "Europe", "North America", "Oceania", "South America"],
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
 * Address Model.
 * Represents the "addresses" collection in the MongoDB database.
 * Provides an interface for interacting with address documents.
 * 
 * @model Address
 * @collection addresses
 */
const Address = mongoose.model("Address", addressSchema, "addresses");

module.exports = Address; // Export the Address model for use in other parts of the application