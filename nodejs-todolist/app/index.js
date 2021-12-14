// import yargs from "yargs"; // es6

const yargs = require("yargs"); // es5

// tạo lệnh
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// lưu lại các lệch vừa tạo
yargs.parse();
