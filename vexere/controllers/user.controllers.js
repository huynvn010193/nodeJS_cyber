const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {
  const { email, password } = req.body;
  // B1: tìm ra user đang đăng nhập dựa trên email

  const user = await User.findOne({
    where: {
      email,
    },
  });
  // B2: kiểm tra mật khẩu có đúng hay không
  if (user) {
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      const token = jwt.sign(
        { email: user.email, type: user.type },
        "huy-nhat-2309",
        { expiresIn: 60 * 60 }
      );
      res.status(200).send({ message: "Đăng nhập thành công!", token });
    } else {
      res.status(500).send({ message: "Đăng nhập thất bại!" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp!" });
  }
};

module.exports = {
  register,
  login,
};
