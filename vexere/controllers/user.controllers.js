const { User } = require("../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    // tạo ra 1 chuỗi ngẩu nhiên
    // genSaltSync : tạo đồng bộ -> tạo xong mới chạy tiếp
    const salt = bcrypt.genSaltSync(10);

    // mã hóa chuỗi ngẫu nhiên vừa mới tạo ra : salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
};
