const formatTime = require("date-format");

const createMessages = (messageText, username) => {
  return {
    messageText,
    username,
    createdAt: formatTime("dd/MM/yyyy - hh:mm:ss", new Date()),
  };
};

module.exports = createMessages;
