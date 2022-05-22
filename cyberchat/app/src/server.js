const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
// sử dụng static file đưa index.html
const publicPathDirectory = path.join(__dirname, "../public");
const formatTime = require("date-format");
const createMessages = require("./utils/create-messages");
const { getUserList, addUser } = require("./utils/users");

// set vầy tự động vô thư mục public và kiếm index.html chạy trc
app.use(express.static(publicPathDirectory));

// tạo server
const server = http.createServer(app);

// khởi tạo socket.io
const io = socketio(server);

let count = 1;
const message = "chào mọi người";

// lắng nghẹ sự kiện kết nối từ client
io.on("connection", (socket) => {
  // nhận lại sự kiện từ client
  // socket.on("send increment client to server", () => {
  //   count++;
  //   // socket.emit("send count server to client", count);
  //   io.emit("send count server to client", count);
  // });

  //truyền count từ server về client
  // socket.emit("send count server to client", count);
  // socket.emit("send message server to client", message);

  // Gửi cho client vừa kết nối vào.

  // ngắt kết nối từ phía client
  socket.on("disconnect", () => {
    console.log("client left server");
  });

  // lắng nghe sự kiện chia room
  socket.on("join room clien from to server", ({ room, username }) => {
    socket.join(room);

    socket.emit(
      "send message from server to client",
      `Chào mừng bạn đến với phòng ${room}`
    );

    // Gửi cho các client còn lại trừ clien đã gửi lên
    socket.broadcast.to(room).emit(
      "send message from server to client",
      createMessages(`client ${username} vừa tham gia vào phòng ${room}`)
      // "Có một Client vừa tham gia vào CyberChat"
    );

    // chat
    socket.on("send message from client to server", (messageText, callback) => {
      const filter = new Filter();
      if (filter.isProfane(messageText)) {
        return callback("messageText không hợp lệ vì có những từ khoá tục tĩu");
      }
      const message = createMessages(messageText);

      io.to(room).emit("send message from server to client", message);
      callback();
    });

    // Xử lý chia sẽ vị trí
    socket.on(
      "share location from client to server",
      ({ latitude, longitude }) => {
        const linkLocation = `https://www.google.com/maps?query=${latitude},${longitude}`;
        io.to(room).emit("share location from server to client", linkLocation);
      }
    );

    // Xử lý userList
    const newUser = {
      id: socket.id,
      username,
      room,
    };

    addUser(newUser);
    io.to(room).emit("send userList from server to client", getUserList(room));
  });
});

const port = 4567;
server.listen(port, () => {
  console.log(`App run on http://localhost:${port}`);
});
