// yêu cầu server kết nối với client
const socket = io();
document.getElementById("form-message").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = document.getElementById("input-message").value;
  const acknowledgements = (errors) => {
    if (errors) {
      return alert("tin nhắn không hợp lệ");
    }
    console.log("Bạn đã gửi tin nhắn thành công!");
  };
  socket.emit(
    "send message from client to server",
    messageText,
    acknowledgements
  );
});

socket.on("send message from server to client", (message) => {
  console.log("messageText", message);
});

// Gửi vị trí
document.getElementById("btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Trình duyệt không hỗ trợ tìm vị trí");
  }
  console.log(navigator);
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    socket.emit("share location from client to server", {
      latitude,
      longitude,
    });
  });
});

socket.on("share location from server to client", (linkLocation) => {
  console.log("linkLocation", linkLocation);
});

// xử lý query string
const queryString = location.search;
// parse params ra object, ignoreQueryPrefix => loại bỏ "?"
const params = Qs.parse(queryString, { ignoreQueryPrefix:true });
console.log("🚀 ~ file: client-chat.js ~ line 46 ~ params", params)

