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

const getList = async () => {
  const studentList = await Student.findAll();
  if (studentList) {
    return studentList;
  } else {
    return false;
  }
};

const getDetail = async (id) => {
  // const index = studentList.findIndex((student) => {
  //   return student.id == id;
  // });

  const student = await Student.findOne({
    where: {
      id,
    },
  });

  if (student) {
    return student;
  } else {
    return false;
  }
};

const create = async (student) => {
  const newStudent = await Student.create(student);
  return newStudent;
};

const update = async (id, student) => {
  // const index = studentList.findIndex((student) => student.id == id);
  const studentUpdate = await getDetail(id);
  if (studentUpdate) {
    studentUpdate.fullName = student.fullName;
    studentUpdate.age = student.age;
    studentUpdate.numberClass = student.numberClass;
    const studentUpdated = await studentUpdate.save();
    return studentUpdated;
  } else {
    return false;
  }
};

const deleteById = async (id) => {
  const studentDelete = await getDetail(id);
  if (studentDelete) {
    await Student.destroy({
      where: {
        id,
      },
    });
    return studentDelete;
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
