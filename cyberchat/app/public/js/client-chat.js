// yêu cầu server kết nối với client
const socket = io();
document.getElementById("form-message").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = document.getElementById("input-message").value;
  const acknowledgements = (errors) => {
    if(errors) {
      return alert("tin nhắn không hợp lệ");
    }
    console.log("Bạn đã gửi tin nhắn thành công!");
  }
  socket.emit("send message from client to server", messageText, acknowledgements);
});

socket.on("send message from server to client", (messageText) => {
  console.log(messageText);
});
