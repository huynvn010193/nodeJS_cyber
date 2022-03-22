const express = require("express");
const { createTrip, getAllTrip } = require("../controllers/trip.controllers");

const tripRouters = express.Router();

tripRouters.post("/", createTrip);
tripRouters.get("/", getAllTrip);

module.exports = {
  tripRouters,
};
