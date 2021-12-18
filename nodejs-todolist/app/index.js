// import yargs from "yargs"; // es6

const yargs = require("yargs"); // es5
const fs = require("fs"); // file system (build in nodeJS);
const { readAllTask, createTask } = require("./model/task");

// tạo lệnh
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

//create - node app/index.js create --title="Hoc nodeJS" --description="Dau kho lam dau"
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("Đã tạo mới thành công", newTask);
  },
});

// read-all - node app/index.js read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(result);
  },
});

// read-detail - node app/index.js read-detail --id="123"
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    console.log("read-detail id", id);
  },
});

// update - node app/index.js update --id="123" --title="Hoc JS" --description="kho lam"
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    console.log("update id title des", id, title, description);
  },
});

// delete - node app/index.js delete --id="123"
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    console.log("delete id", id);
  },
});

// lưu lại các lệch vừa tạo
yargs.parse();
