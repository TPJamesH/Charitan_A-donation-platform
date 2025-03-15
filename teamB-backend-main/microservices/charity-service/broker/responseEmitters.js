const { EventEmitter } = require("events");

const responseEmitters = {
  charityValidation: new EventEmitter(),
};

module.exports = responseEmitters;
