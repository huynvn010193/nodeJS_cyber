let userList = [
  {
    id: "1",
    username: "Nguyễn Phong Hào",
    room: "fe02",
  },
  {
    id: "2",
    username: "Đặng Trung Hiếu",
    room: "fe01",
  },
];

const addUser = (newUser) => userList = [...userList, newUser];

const getUserList = (room) => userList.filter((user) => user.room === room);

module.exports = { getUserList, addUser };
