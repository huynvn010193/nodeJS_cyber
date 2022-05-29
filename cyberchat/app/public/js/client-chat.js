// yêu cầu server kết nối với client
const socket = io();
document.getElementById("form-messages").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  const messageText = document.getElementById("input-messages").value;
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
  console.log("messageText 1", message);
  const { createdAt, messageText } = message;
  console.log({ createdAt, messageText });
  // hiển thị lên màn hình
  const messageElemt = `
    <div class="message-item">
      <div class="message__row1">
        <div class="message__name">Nguyễn Phong Hào</div>
        <div class="message__date">${createdAt}</div>
      </div>
      <div class="message__row2">
        <p class="message__content">
          ${messageText}
        </p>
      </div>
    </div>
  `
  document.getElementById("app__messages").innerHTML += messageElemt;
});

// Gửi vị trí
document.getElementById("btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Trình duyệt không hỗ trợ tìm vị trí");
  }
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
const params = Qs.parse(queryString, { ignoreQueryPrefix: true });
const { room, username } = params;

socket.emit("join room clien from to server", { room, username });

// hiển thị tên phòng lên trên màn hình
document.getElementById("app__title").innerHTML = room;

// Xử lý userList
socket.on("send userList from server to client", (userList) => {
  let contentHTML = '';
  userList.map((user) => {
    contentHTML += `<li class="app__item-user">${user.username}</li>`
  });
  document.getElementById("app__list-user--content").innerHTML = contentHTML;
});

socket;
