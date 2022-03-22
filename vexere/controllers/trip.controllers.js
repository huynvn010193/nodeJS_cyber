const { Trips, Station } = require("../models");

const createTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  const newTrip = await Trips.create({
    fromStation,
    toStation,
    startTime,
    price,
  });
  res.status(201).send(newTrip);
};

const getAllTrip = async (req, res) => {
  const tripList = await Trips.findAll({
    include: [
      {
        model: Station,
        as: "from",
      },
      {
        model: Station,
        as: "to",
      },
    ],
  });
  res.status(200).send(tripList);
};

const deleteTrip = async (req, res) => {
  const { id } = req.params;
  await Trips.destroy({
    where: {
      id,
    },
  });
  res.send(`Đã xóa trip có id là ${id}`);
};

const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { fromStation, toStation, startTime, price } = req.body;
  const tripUpdate = await Trips.update(
    { fromStation, toStation, startTime, price },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).send(`Đã cập nhật trip có id là ${id}`);
};

module.exports = {
  createTrip,
  getAllTrip,
  deleteTrip,
  updateTrip,
};
