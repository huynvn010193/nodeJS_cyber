const logFeature = (req, res, next) => {
  console.log("Đây là tính năng lấy danh sách sản phẩm!");
  next();
};

module.exports = {
  logFeature,
};
