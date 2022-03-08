const { Station } = require("../models");

const createStation = async (req, res) => {
  const { name, address, provinces } = req.body;
  try {
    const newStation = await Station.create({ name, address, provinces });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createStation,
};
