const { mongoose } = require("../db/db");
// import UserType from "./enum/auth.enum";

const UserType = Object.freeze({
  ADMIN: "Admin",
  DONOR: "Donor",
  CHARITY: "Charity",
});

const authSchema = new mongoose.Schema({

  // authID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  username: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: [true, 'email must be unique']
  },

  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email must be unique'],
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },



  hashedpassword: {
    type: String,
    required: [true, 'password is required']
  },

  role: {
    type: String,
    enum: Object.values(UserType),
    required: true
  },


  createdAt: {
    type: Date,
    default: Date.now()
  },

  isActive: {
    type: Boolean,
  },

  refreshToken: {
    type: String,
    required: false,
    default: ""
  }

});

Object.freeze(UserType);

const Authentication = mongoose.model("Auth", authSchema);

module.exports = { Authentication, UserType };