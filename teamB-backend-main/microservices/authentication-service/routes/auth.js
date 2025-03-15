const express = require("express");
const authController = require("../controllers/authController.js");

const dataRouters = express.Router();

dataRouters.post(
  "/register",
  authController.decrypter,
  authController.register
);
dataRouters.post("/login", authController.decrypter, authController.login);
dataRouters.post("/refresh", authController.refresh);
dataRouters.post("/verify-email", authController.verifyEmail);
dataRouters.delete("/logout", authController.verify, authController.logout);
dataRouters.get("/token", authController.verify, authController.getToken);

module.exports = dataRouters;
