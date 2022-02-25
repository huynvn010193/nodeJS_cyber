let productList = [
  {
    id: 1,
    name: "San pham 01",
    price: 3000,
    amount: 101,
    sale: "10%"
  },
  {
    id: 2,
    name: "San pham 02",
    price: 2000,
    amount: 90,
    sale: "20%"
  },
  {
    id: 3,
    name: "San pham 03",
    price: 5000,
    amount: 50,
    sale: "15%"
  },
];

const getList = () => {
  if(productList) {
    return productList
  } else {
    return false;
  }
}

const getDetail = (id) => {
  const index = productList.findIndex((product) => product.id == id);
  if(index !== -1) {
    const product = productList[index];
    return product;
  } else {
    return false;
  }
}

const createProduct = (product) => {
  const newProduct = { id: Math.random(), ...product};
  productList = [...productList, newProduct];
  return newProduct;
}

const updateProduct = (id,product) => {
  const index = productList.findIndex((product) => id === product.id);
  if(index !== -1) {
    const oldProduct = productList[index];
    const producted = {...oldProduct,...product};
    productList[index] = producted;
    return producted;
  } else {
    return false;
  }
}

const deleteProduct = (id) => {
  const index = productList.findIndex((product) => id === product.id);
  if(index !== -1) {
    const product = productList[index];
    productList.splice(index,1);
    return product;
  } else {
    return false;
  }
}

module.exports = {
  getList,
  getDetail,
  createProduct,
  updateProduct,
  deleteProduct
}