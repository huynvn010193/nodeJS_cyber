const { Student } = require("../model");

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

const getList = () => {
  if (studentList) {
    return studentList;
  } else {
    return false;
  }
};

const getDetail = (id) => {
  const index = studentList.findIndex((student) => {
    return student.id == id;
  });

  if (index !== -1) {
    const student = studentList[index];
    return student;
  } else {
    return false;
  }
};

const create = async (student) => {
  const newStudent = await Student.create(student);
  return newStudent;
};

const update = (id, student) => {
  const index = studentList.findIndex((student) => student.id == id);
  if (index !== -1) {
    const oldStudent = studentList[index];
    const studentUpdated = { ...oldStudent, ...student };
    studentList[index] = studentUpdated;
    return studentUpdated;
  } else {
    return false;
  }
};

const deleteById = (id) => {
  const index = studentList.findIndex((student) => student.id == id);
  if (index !== -1) {
    const student = studentList[index];
    studentList.splice(index, 1);
    return student;
  } else {
    return false;
  }
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  deleteById,
};
