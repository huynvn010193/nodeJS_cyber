let studentList = [
  {
    id: 1,
    fullName: "Nguyễn Phong Hào",
    age: 18,
    numberClass: 12,
  },
  {
    id: 2,
    fullName: "Nguyễn Văn Bưởi",
    age: 17,
    numberClass: 11,
  },
  {
    id: 3,
    fullName: "Lê Thị Chuối",
    age: 15,
    numberClass: 9,
  },
];

const getStudentList = (req, res) => {
  res.status(200).send(studentList);
};

const getStudentDetailById = (req, res) => {
  const params = req.params;
  const id = params.id;

  const index = studentList.findIndex((student) => {
    return student.id == id;
  });

  if (index !== -1) {
    const student = studentList[index];
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found");
  }
};

const createStudent = (req, res) => {
  let student = req.body;
  // Tạo id không dc trùng
  student = { id: Math.random(), ...student };
  studentList = [...studentList, student];
  res.status(201).send(student);
};

const updateStudentById = (req, res) => {
  const { id } = req.params;
  const { fullName, age, numberClass } = req.body;
  const index = studentList.findIndex((student) => student.id == id);
  if (index !== -1) {
    const oldStudent = studentList[index];
    const updatedStudent = { ...oldStudent, fullName, age, numberClass };
    studentList[index] = updatedStudent;
    res.status(200).send(updatedStudent);
  } else {
    res.status(404).send("Not Found");
  }
};

const deleteStudentById = (req, res) => {
  const { id } = req.params;
  const index = studentList.findIndex((student) => student.id == id);
  if (index !== -1) {
    const student = studentList[index];
    studentList.splice(index, 1);
    res.status(200).send(studentList);
  } else {
    res.status(404).send("Not found");
  }
};

module.exports = {
  getStudentList,
  getStudentDetailById,
  createStudent,
  updateStudentById,
  deleteStudentById,
};
