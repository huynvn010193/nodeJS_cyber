import {
  getProductList,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api/product.js";

let store = {
  productDetail: null,
};

const renderProductList = async () => {
  const list = await getProductList();
  const contentHtml = list
    .reverse()
    .map(
      (item, index) => `<tr>
    <th scope="row">${(index += 1)}</th>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${item.amount}</td>
    <td>${item.sale}</td>
    <td>
      <button type="button" class="btn btn-outline-danger"
      onclick="handleDelete('${item.id}')"
      >
        Xóa
      </button>
      <button
        type="button"
        class="btn btn-outline-info"
        data-toggle="modal"
        data-target="#productModal"
        onclick="handleEdit('${item.id}')"
      >
        Sửa
      </button>
    </td>
  </tr>`
    )
    .reduce((sumString, item) => (sumString += item), "");
  document.getElementById("tbody").innerHTML = contentHtml;
};
renderProductList();

const handleEdit = async (id) => {
  document.getElementById("title-model").innerHTML = "Sửa Học Sinh";
  document.getElementById("addProduct").style["display"] = "none";
  document.getElementById("updateProduct").style["display"] = "block";
  const product = await getProductDetail(id);
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("amount").value = product.amount;
  document.getElementById("sale").value = product.sale;
  store.productDetail = product;
};
window.handleEdit = handleEdit;
document.getElementById("btnPopupModalAdd").addEventListener("click", () => {
  document.getElementById("title-model").innerHTML = "Thêm Học Sinh";
  document.getElementById("addProduct").style["display"] = "block";
  document.getElementById("updateProduct").style["display"] = "none";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("sale").value = "";
});

document.getElementById("addProduct").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const price = +document.getElementById("price").value;
  const amount = +document.getElementById("amount").value;
  const sale = +document.getElementById("sale").value;
  const product = { name, price, amount, sale };
  await createProduct(product);
  await renderProductList();
  $("#modalMessage").modal("show");
  $("#productModal").modal("hide");
});

document.getElementById("updateProduct").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const price = +document.getElementById("price").value;
  const amount = +document.getElementById("amount").value;
  const sale = +document.getElementById("sale").value;
  const { id } = store.productDetail;
  const product = { name, price, amount, sale };

  await updateProduct(id, product);

  await renderProductList();
  $("#modalMessage").modal("show");
  $("#productModal").modal("hide");
});

const handleDelete = async (id) => {
  await deleteProduct(id);
  await renderProductList();
  $("#modalMessage").modal("show");
};
window.handleDelete = handleDelete;
