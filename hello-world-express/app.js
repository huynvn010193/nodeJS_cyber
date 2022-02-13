const express = require('express');
const app = express();
const port = 3000;

const studentList = [
  {
    id: 1, 
    fullName : "Nguyễn Phong Hào",
    age : 18,
    numberClass : 12
  },
  {
    id: 2, 
    fullName : "Nguyễn Văn Bưởi",
    age : 17,
    numberClass : 11
  },
  {
    id: 3, 
    fullName : "Lê Thị Chuối",
    age : 15,
    numberClass : 9
  },
]

// chuyển req, res về dạng json tiện thao tác
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Lấy danh sách học sinh (url: http://localhost:3000/students)
app.get('/students', (req, res) => {
  res.status(200).send(studentList);
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

// Cập nhật học sinh
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const student = req.body;
  console.log("id-student",id, student);
  res.send('cập nhật học sinh');
});

// Xoá học sinh 
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  res.send('delete học sinh có id: ' + id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
