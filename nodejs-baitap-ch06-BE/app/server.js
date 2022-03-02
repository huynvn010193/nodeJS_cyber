const express = require("express");
const router = require("./routers/root.router");
const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { sequelize } = require("./model");
sequelize.sync({ alter: true });
