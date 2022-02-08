const express = require('express');
const app = express();
const port = 3000;

// chuyển req, res về dạng json tiện thao tác
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Lấy danh sách học sinh (url: http://localhost:3000/students)
app.get('/students', (req, res) => {
  res.send('Lấy danh sách học sinh');
});

// lấy thông tin chi tiết học sinh
app.get('/students/:id', (req, res) => {
  const params = req.params;
  const id = params.id;
  res.send('lấy thông tin chi tiết của học sinh có id là: ' +id);
});

// thêm danh sách học sinh
app.post("/students", (req, res) => {
  const student = req.body;
  console.log(req.body);
  res.send('thêm học sinh');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
