const express = require("express");
const { createStation, getAllStation, getDetailStation } = require("../controllers/station.controllers");

const stationRouter = express.Router();

stationRouter.post("/", createStation);
stationRouter.get("/", getAllStation);
stationRouter.get("/:id", getDetailStation);

module.exports = {
  stationRouter,
};
