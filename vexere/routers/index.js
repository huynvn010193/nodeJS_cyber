const express = require("express");
const { stationRouter } = require("./station.routers");
const { tripRouters } = require("./trip.routers");
const { userRouter } = require("./user.routers");

const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/trips", tripRouters);

module.exports = {
  rootRouter,
};
