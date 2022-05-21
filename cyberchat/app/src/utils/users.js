const userList = [
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

const getUserList = (room) => userList.filter((user) => user.room === room);

module.exports = { getUserList };
