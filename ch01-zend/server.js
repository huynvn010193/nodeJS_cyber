const http = require('http');
const express = require('express');
const app = express();

const courses = [
  { id: 1, name: 'NodeJS'},
  { id: 2, name: 'ReactJS'},
  { id: 3, name: 'PHP'},
]

/* Update Code */
// const server = http.createServer((req, res) => {
//   // res.setHeader('Content-Type', 'application/json'); // set Header
//   // res.setHeader('X-Powered-By', 'Node.js');
//   // res.statusCode = 404;

//   // Cách viết gọn. 
//   res.writeHead(404, {
//     'Content-Type' : 'application/json',
//     'X-Powered-By' : 'Node.js'
//   });

//   res.end(JSON.stringify({
//     success: false,
//     error: 'NOT FOUND',
//     data: null
//   })); 
// });

app.get('/', (req, res) => {
  res.send('Bạn đang tham gia NodeJS');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((course => course.id === parseInt(req.params.id)));
  if(!course) res.status(404).send("Id không tồn tại");
  res.send(course);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));