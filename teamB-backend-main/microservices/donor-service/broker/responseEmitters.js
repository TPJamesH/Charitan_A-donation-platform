const { EventEmitter } = require("events");

const responseEmitters = {
  donorValidation: new EventEmitter(),
  donorGetUserEmail: new EventEmitter(),
  donorGetTopMonthlyUser: new EventEmitter(),
};

module.exports = responseEmitters;
