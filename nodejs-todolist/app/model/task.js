const fs = require("fs"); // file system (build in nodeJS);

const readAllTask = () => {
  const buffer = fs.readFileSync("task.json");
  // chuyển sang chuỗi
  const taskString = buffer.toString();

  // chuyển sang kiểu json.
  const taskJson = JSON.parse(taskString);

  return taskJson;
}

module.exports = {
  readAllTask
}
