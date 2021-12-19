const chalk = require("chalk");
const yargs = require("yargs"); // es5
const fs = require("fs"); // file system (build in nodeJS);

const {
  deleteProduct,
  readAllProduct,
  readDetailProduct,
  createProduct,
  updateProduct,
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

// read-detail - node app/index.js read-detail --id="1"
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const product = readDetailProduct(id);
    if (product) {
      console.log("product: ", product);
    } else {
      console.log(chalk.yellow("Not found"));
    }
  },
});

// create - node app/index.js create --name="sam pham 03" --price=3000 --amount=1 --description="san pham 03"
yargs.command({
  command: "create",
  builder: {
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, price, amount, description } = args;
    const newProduct = createProduct(title, price, amount, description);
  },
});

// update - node app/index.js update --name="sam pham 003" --price=2000 --amount=2 --description="san pham 03"
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, name, price, amount, description } = args;
    const product = updateProduct(id, name, price, amount, description);
    if (product) {
      console.log("product updated: ", product);
    } else {
      console.log("Not found");
    }
  },
});

// delete - node app/index.js delete --id="1"
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const product = deleteProduct(id);
    if (product) {
      console.log("product deleted: ", product);
    } else {
      console.log("Not found");
    }
  },
});

yargs.parse();
