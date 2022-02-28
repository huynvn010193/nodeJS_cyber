const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("task_management", "root", "admin23!%", {
  host: "localhost",
  dialect: "mysql",
});

// Tạo model
const Task = sequelize.define("Task", {
  name: {
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false, // Không bao giờ dc null
  },
  status: {
    type: DataTypes.STRING,
  },
});

const createTask = async (name, status) => {
  // cách 1: build and save
  // const newTask = Task.build({
  //   name,
  //   status,
  // });
  // await newTask.save();
  // Cách 2
  const newTask = await Task.create({
    name,
    status,
  });
};

// createTask("Học JS", "Pending");

const getAllTask = async () => {
  const taskList = await Task.findAll();
  console.log(JSON.stringify(taskList, null, 2));
};

// getAllTask();

const getTaskById = async (id) => {
  const task = await Task.findOne({
    where: {
      id,
    },
  });
  console.log("task: ", JSON.stringify(task, null, 2));
};

getTaskById(3);

const upadteTaskById = async (data,id) => {
  await Task.update(data, {
    where: {
      id
    },
  })
}

// upadteTaskById({
//   name: "Học Lập Trình 5_2",
//   status: "OPEN",
// },5);

const deleteByID = async (id) => {
  await Task.destroy({
    where: {
      id
    }
  })
}

// deleteByID(16);


// Đồng bộ model
const syncModel = async () => {
  // force: true nghĩa là model thay đổi thì bảng đó bị xoá đi tạo ra bảng mới.
  await Task.sync({ force: true });
  // Task.sync({alter: true}); // Không xoá bảng cũ mà chỉ sửa bảng cũ thành bảng mới.
  console.log("Đã đồng bộ model task");
};

// syncModel();

const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công");
  } catch (error) {
    console.log("Kết nối thất bại", error);
  }
};

checkConnect();
