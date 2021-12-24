const asyncRequest = require("async-request");

const getWeather = async (location) => {
  const access_key = "c820e73dd2c90cf79724c46989b208da";
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
  try {
    const res = await asyncRequest(url);
    const data = JSON.parse(res.body);
    const weather = {
      issuccess: true,
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
    };
    console.log("res", weather);
    return weather;
  } catch (err) {
    console.log("res", err);
    return {
      issuccess: false,
      err,
    };
  }
};

// getWeather("tokyo");

const express = require("express");
const app = express();
const path = require("path");

const pathPublic = path.join(__dirname, "./public");
app.use(express.static(pathPublic));

app.get("/", async (req, res) => {
  const params = req.query;

  const location = params.address;
  const weather = await getWeather(location);
  console.log(weather);
  res.render("weather");
});

// setup hbs
app.set("view engine", "hbs");

const port = 7000;

app.listen(port, () => {
  console.log("app run on port 7000");
});
