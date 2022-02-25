const express = require("express");
const studentRouter = express.Router();
const { logFeature } = require("../middlewares/logger/log-feature");
const {
  checkEmpty,
  checkNumberClass,
} = require("../middlewares/validations/student.validations");
const {
  getStudentList,
  getStudentDetailById,
  createStudent,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/student.controllers");

// Lấy danh sách học sinh (url: http://localhost:3000/students)
studentRouter.get("/", logFeature, getStudentList);

// lấy thông tin chi tiết học sinh
studentRouter.get("/:id", getStudentDetailById);

// thêm danh sách học sinh
studentRouter.post("/", checkEmpty, checkNumberClass, createStudent);

// Cập nhật học sinh
studentRouter.put("/:id", updateStudentById);

// Xoá học sinh
studentRouter.delete("/:id", deleteStudentById);

module.exports = studentRouter;
