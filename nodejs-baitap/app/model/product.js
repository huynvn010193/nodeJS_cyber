const fs = require("fs"); // file system (build in nodeJS);

const readAllProduct = () => {
  const buffer = fs.readFileSync("product.json");
  // chuyển sang chuỗi
  const productString = buffer.toString();

  // chuyển sang kiểu json.
  const productJson = JSON.parse(productString);
  return productJson;
};

module.exports = {
  readAllProduct,
};