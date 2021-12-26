const asyncRequest = require("async-request");

const getPosition = async (location) => {
  const access_key =
    "pk.eyJ1IjoiaHV5bnZuIiwiYSI6ImNreGxxODBmZzN0aGMydW9jODZwY2lxd2kifQ.KRm0aoMy92AETD7IK0Hk6Q";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${access_key}`;
  try {
    const res = await asyncRequest(url);
    const data = JSON.parse(res.body);
    console.log("data", data);
    return data.features.map((item) => ({
      place_name: item.place_name,
      longitude: item.center[0],
      latitude: item.center[1],
    }));
  } catch (err) {
    console.log("res", err);
    return {
      issuccess: false,
      err,
    };
  }
};

const express = require("express");

const app = express();
const path = require("path");

const pathPublic = path.join(__dirname, "./public");
app.use(express.static(pathPublic));

const port = 7000;

app.get("/", async (req, res) => {
  const params = req.query;
  const location = params.address;
  const data = await getPosition(location);
  console.log("data", data);
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("app run on port 7000");
});
