const { getList, getDetail, createProduct, updateProduct, deleteProduct } = require("../services/product.services");

const getProductlist = (req,res) => {
  const productList = getList();
  if(productList) {
    res.status(200).send(productList);
  } else {
    res.status(404).send("Not Found");
  }
}

const getProductDetailById = (req,res) => {
  const params = req.params;
  const id = params.id;
  const product = getDetail(id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Not found");
  }
}

const createProductNew = (req, res) => {
  let product = req.body;

  const newProduct = createProduct(product);
  res.status(201).send(newProduct);
};

const updateProductById = (req,res) => {
  const { id } = req.params;
  const product = req.body;

  const productUpdated = updateProduct(id, product);

  if (productUpdated) {
    res.status(200).send(productUpdated);
  } else {
    res.status(404).send("Not found");
  }
}

const deleteProductById = (req,res) => {
  const { id } = req.params;
  const product = deleteProduct(id);

  if (student) {
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found");
  }
}

module.exports = {
  getProductlist,
  getProductDetailById,
  createProductNew,
  updateProductById,
  deleteProductById
}