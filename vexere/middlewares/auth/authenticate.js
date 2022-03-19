const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
  try {
    const token = req.header("token");
    const decode = jwt.verify(token, "huy-nhat-2309");
    if(decode) {
      req.user = decode;
      return next();
    } else {
      res.status(401).send("Bạn chưa đăng nhập xác thực người dùng")
    }
  } catch (error) {
    res.status(401).send("Bạn Chưa Đăng Nhập");
  }
};

module.exports = {
  authenticate
}