const http = require('http');

const server = http.createServer((req, res) => {
  res.write("hello word");
  res.end(); 
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));