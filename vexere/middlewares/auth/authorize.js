const authorize = (arrType) => (req, res, next) => {
  // do authenticate chạy trước đã truyền vào req.use;
  const { user } = req;
  console.log(user, user.type);
  if(arrType.findIndex((ele) => ele === user.type) > -1){
    next();
  } else {
    res.status(403).send("đã đăng nhập nhưng có quyền");
  }
};

module.exports = {
  authorize,
}
