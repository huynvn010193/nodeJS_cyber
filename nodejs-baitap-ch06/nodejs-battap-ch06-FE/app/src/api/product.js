// call api
const getProductList = async () => {
  const res = await axios({
    method: "GET",
    url: `http://localhost:3000/products`,
  });
  return res.data;
};

const getProductDetail = async (id) => {
  const res = await axios({
    method: "GET",
    url: `http://localhost:3000/products/${id}`,
  });
  return res.data;
};

const createProduct = async (product) => {
  const res = await axios({
    method: "POST",
    url: `http://localhost:3000/products`,
    data: product,
  });
  return res.data;
};

const updateProduct = async (id, product) => {
  const res = await axios({
    method: "PUT",
    url: `http://localhost:3000/products/${id}`,
    data: product,
  });
  return res.data;
};

const deleteProduct = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `http://localhost:3000/products/${id}`,
  });
  return res.data;
  //   $("#modalMessage").modal("show");
  //   await getProductList();
};

export {
  getProductList,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
