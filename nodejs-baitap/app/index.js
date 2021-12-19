const chalk = require("chalk");
const yargs = require("yargs"); // es5
const fs = require("fs"); // file system (build in nodeJS);

const {
  readAllProduct
} = require("./model/product");

// node app/index.js test
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});



// create - node app/index.js test
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// read-all - node app/index.js read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllProduct();
    console.log(chalk.blue("All-Product"), result);
  },
});

yargs.parse();
