const http = require('http');

const COURSE = [
  { id: 1, name: 'NodeJS'},
  { id: 2, name: 'ReactJS'},
]

/* Update Code */
const server = http.createServer((req, res) => {
  // res.setHeader('Content-Type', 'application/json'); // set Header
  // res.setHeader('X-Powered-By', 'Node.js');
  // res.statusCode = 404;

  // Cách viết gọn. 
  res.writeHead(404, {
    'Content-Type' : 'application/json',
    'X-Powered-By' : 'Node.js'
  });

  res.end(JSON.stringify({
    success: false,
    error: 'NOT FOUND',
    data: null
  })); 
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));