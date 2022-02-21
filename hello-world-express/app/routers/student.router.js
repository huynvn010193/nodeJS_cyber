const express = require('express');
const studentRouter = express.Router();

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

// Lấy danh sách học sinh (url: http://localhost:3000/students)
studentRouter.get('/', (req, res) => {
  res.status(200).send(studentList);
});

// lấy thông tin chi tiết học sinh
studentRouter.get('/:id', (req, res) => {
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
  studentRouter.post("/", (req, res) => {
    let student = req.body;
    // Tạo id không dc trùng
    student = {id: Math.random(),...student};
    studentList = [...studentList, student];
    res.status(201).send(student);
  });
  
  // Cập nhật học sinh
  studentRouter.put("/:id", (req, res) => {
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
  studentRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = studentList.findIndex((student) => student.id == id);
    if(index !== -1) {
      const student = studentList[index];
      studentList.splice(index,1);
      res.status(200).send(studentList);
    } else {
      res.status(404).send("Not found");
    }
  });

module.exports = studentRouter;