const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
// sử dụng static file đưa index.html
const publicPathDirectory = path.join(__dirname, "../public");

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

  socket.on("send message from client to server", (messageText) => {
    io.emit("send message from server to client", messageText);
  });

  socket.on("disconnect", () => {
    console.log("client left server");
  });
});

// ngắt kết nối từ phía client

const port = 4567;
server.listen(port, () => {
  console.log(`App run on http://localhost:${port}`);
});
