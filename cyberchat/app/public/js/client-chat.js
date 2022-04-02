// yêu cầu server kết nối với client
const socket = io();
document.getElementById("form-message").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = document.getElementById("input-message").value;
  socket.emit("send message from client to server", messageText);
});

socket.on("send message from server to client", (messageText) => {
  console.log(messageText);
});
