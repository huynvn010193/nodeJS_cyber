const {
  getList,
  getDetail,
  create,
  update,
  deleteById,
} = require("../services/student.services");

const getStudentList = async (req, res) => {
  const studentList = await getList();
  if (studentList) {
    res.status(200).send(studentList);
  } else {
    res.status(404).send("Not Found");
  }
};

const getStudentDetailById = async (req, res) => {
  const params = req.params;
  const id = params.id;

  const student = await getDetail(id);

  if (student) {
    res.status(200).send(student);
  } else {
    res.status(404).send("Not found");
  }
};

const createStudent = async (req, res) => {
  let student = req.body;

  const newStudent = await create(student);
  res.status(201).send(newStudent);
};

const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const student = req.body;

  const studentUpdated = await update(id, student);

  if (studentUpdated) {
    res.status(200).send(studentUpdated);
  } else {
    res.status(404).send("Not found");
  }
};

const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await deleteById(id);

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
