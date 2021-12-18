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

module.exports = {
  readDetailTask,
  readAllTask,
  createTask,
};
