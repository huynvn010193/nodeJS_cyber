const fs = require("fs"); // file system (build in nodeJS);

const readAllProduct = () => {
  const buffer = fs.readFileSync("product.json");
  // chuyển sang chuỗi
  const productString = buffer.toString();

  // chuyển sang kiểu json.
  const productJson = JSON.parse(productString);
  return productJson;
};

const readDetailProduct = (id) => {
  let productList = readAllProduct();
  const prdduct = productList.find((product) => id === product.id);
  return prdduct;
};

const createProduct = (name, price, amount, description) => {
  const newProduct = {
    id: Math.random().toString(),
    name,
    price,
    amount,
    description,
  };
  let productList = readAllProduct();
  productList = [...productList, newProduct];
  fs.writeFileSync("product.json", JSON.stringify(productList));
  return newProduct;
};

const updateProduct = (id, name, price, amount, description) => {
  let productList = readAllProduct();
  const index = productList.findIndex((task) => id === task.id);
  if (index !== -1) {
    // thực hiện update
    const oldProduct = productList[index];
    const newProduct = { ...oldProduct, name, price, amount, description };
    productList[index] = newProduct;
    fs.writeFileSync("product.json", JSON.stringify(productList));
    return newProduct;
  } else {
    // thông báo cho người dùng bik
    return false;
  }
};

const deleteProduct = (id) => {
  let productList = readAllProduct();
  const index = productList.findIndex((product) => id === product.id);
  if (index !== -1) {
    // thực hiện deleta
    const product = productList[index];
    productList = productList.filter((product) => product.id !== id);
    fs.writeFileSync("product.json", JSON.stringify(productList));

    return product;
  } else {
    // thông báo cho người dùng bik
    return false;
  }
};

module.exports = {
  deleteProduct,
  updateProduct,
  createProduct,
  readAllProduct,
  readDetailProduct,
};
