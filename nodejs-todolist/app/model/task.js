const fs = require("fs"); // file system (build in nodeJS);

const readAllTask = () => {
  const buffer = fs.readFileSync("task.json");
  // chuyển sang chuỗi
  const taskString = buffer.toString();

  // chuyển sang kiểu json.
  const taskJson = JSON.parse(taskString);
  return taskJson;
};

const createTask = (title, description) => {
  const newTask = {
    id: Math.random().toString(),
    title,
    description,
  };
  let taskList = readAllTask();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

const readDetailTask = (id) => {
  let taskList = readAllTask();
  const task = taskList.find((task) => id === task.id);
  return task;
};

const updateTask = (id, title, description) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => id === task.id);
  if (index !== -1) {
    // thực hiện update
    const oldTask = taskList[index];
    const newTask = { ...oldTask, title, description };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    // thông báo cho người dùng bik
    return false;
  }
};

const deleteTask = (id) => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => id === task.id);
  if (index !== -1) {
    // thực hiện deleta
    const task = taskList[index];
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    // thông báo cho người dùng bik
    return false;
  }
};

module.exports = {
  deleteTask,
  updateTask,
  readDetailTask,
  readAllTask,
  createTask,
};
