const http = require('http');
const express = require('express');
const app = express();

app.use(express.json());


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

app.post('/api/courses/add', (req, res) => {
  const { id, name } = req.body;
  const course = { id, name };
  courses.push(course);
  res.send(JSON.stringify({
    success: true,
    notice: "Bạn đã thêm thành công!",
    data: courses
  }));
});

app.put('/api/courses/edit/:id', (req, res) => {
  const { name } = req.body;
  const course = courses.find((course => course.id === parseInt(req.params.id)));
  course.name = name;
  res.send(JSON.stringify({
    success: true,
    notice: "Bạn đã cập nhật thành công!",
    data: courses
  }));
});

app.delete('/api/courses/delete/:id', (req, res) => {
  const { id } = req.params
  const course = courses.find((course => course.id === parseInt(id)));
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(JSON.stringify({
    success: true,
    notice: "Bạn đã xoá thành công!",
    data: courses
  }));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));