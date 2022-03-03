const { Product } = require("../model");

const getList = async () => {
  const productList = await Product.findAll();
  if (productList) {
    return productList;
  } else {
    return false;
  }
};

const getDetail = async (id) => {
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  if (product) {
    return product;
  } else {
    return false;
  }
};

const createProduct = async (product) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

const updateProduct = async (id, product) => {
  const productUpdate = await getDetail(id);
  if (productUpdate) {
    productUpdate.name = product.name;
    productUpdate.price = product.price;
    productUpdate.amount = product.amount;
    productUpdate.sale = product.sale;
    const productUpdated = await productUpdate.save();
    return productUpdated;
  } else {
    return false;
  }
};

const deleteProduct = async (id) => {
  const productDelete = await getDetail(id);
  if (productDelete) {
    await Product.destroy({
      where: {
        id,
      },
    });
    return productDelete;
  } else {
    return false;
  }
};

module.exports = {
  getList,
  getDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
