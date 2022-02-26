const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("task_management","root","admin23!%",{
  host: "localhost",
  dialect: "mysql"
});

const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công");
  } catch (error) {
    console.log("Kết nối thất bại", error);
  }
};

checkConnect();