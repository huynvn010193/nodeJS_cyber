const { User, sequelize } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar-url");

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    // tạo avatar mặc định
    const avatarUrl = gravatarUrl(email);

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
      avatar: avatarUrl,
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

const uploadAvartar = async (req, res) => {
  const { user, file } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const userFound = await User.findOne({
    email: user.email,
  });
  userFound.avatar = urlImage;
  await userFound.save();
  res.send(userFound);
};

const getAllTrip = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      `select users.name as userName, formSta.name as fromStation, toSta.name as toStation from users
      inner join tickets on users.id = tickets.user_id
      inner join trips on trips.id = tickets.trip_id
      inner join stations as formSta on formSta.id = trips.fromStation
      inner join stations as toSta on toSta.id = trips.toStation;`
    );
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  uploadAvartar,
  getAllTrip,
};
