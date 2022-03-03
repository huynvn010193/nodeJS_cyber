const {
  getList,
  getDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product.services");

const getProductlist = async (req, res) => {
  const productList = await getList();
  if (productList) {
    res.status(200).send(productList);
  } else {
    res.status(404).send("Not Found");
  }
};

const getProductDetailById = async (req, res) => {
  const params = req.params;
  const id = params.id;
  const product = await getDetail(id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Not found");
  }
};

const createProductNew = async (req, res) => {
  let product = req.body;

  const newProduct = await createProduct(product);
  res.status(201).send(newProduct);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const productUpdated = await updateProduct(id, product);

  if (productUpdated) {
    res.status(200).send(productUpdated);
  } else {
    res.status(404).send("Not found");
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const product = await deleteProduct(id);

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Not found");
  }
};

module.exports = {
  getProductlist,
  getProductDetailById,
  createProductNew,
  updateProductById,
  deleteProductById,
};
