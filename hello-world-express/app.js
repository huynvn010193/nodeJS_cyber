const express = require('express');
const app = express();
const port = 3000;

let studentList = [
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

  const index = studentList.findIndex((student) => {
    return student.id == id;
  });

  if(index !== -1) {
    const student = studentList[index];
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found");
  }
});

// thêm danh sách học sinh
app.post("/students", (req, res) => {
  let student = req.body;
  // Tạo id không dc trùng
  student = {id: Math.random(),...student};
  studentList = [...studentList, student];
  res.status(201).send(student);
});

// Cập nhật học sinh
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const {fullName, age, numberClass} = req.body;
  const index = studentList.findIndex((student) => student.id == id);
  if(index !== -1) {
    const oldStudent = studentList[index];
    const updatedStudent = {...oldStudent, fullName, age, numberClass };
    studentList[index] = updatedStudent;
    res.status(200).send(updatedStudent);
  } else {
    res.status(404).send("Not Found");
  }
  
});

// Xoá học sinh 
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  

  res.status(200).send(updatedStudent);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
