const {
  getList,
  getDetail,
  create,
  update,
  deleteById,
} = require("../services/student.services");

const getStudentList = (req, res) => {
  const studentList = getList();
  if (studentList) {
    res.status(200).send(studentList);
  } else {
    res.status(404).send("Not Found");
  }
};

const getStudentDetailById = (req, res) => {
  const params = req.params;
  const id = params.id;

  const student = getDetail(id);

  if (student) {
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found");
  }
};

const createStudent = (req, res) => {
  let student = req.body;

  const newStudent = create(student);
  res.status(201).send(newStudent);
};

const updateStudentById = (req, res) => {
  const { id } = req.params;
  const student = req.body;

  const studentUpdated = update(id, student);

  if (studentUpdated) {
    res.status(200).send(studentUpdated);
  } else {
    res.status(404).send("Not found");
  }
};

const deleteStudentById = (req, res) => {
  const { id } = req.params;
  const student = deleteById(id);

  if (student) {
    res.status(200).send(student);
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
