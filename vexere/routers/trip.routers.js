const express = require("express");
const { createTrip } = require("../controllers/trip.controllers");

const tripRouters = express.Router();

tripRouters.post("/", createTrip);

module.exports = {
  tripRouters,
};
