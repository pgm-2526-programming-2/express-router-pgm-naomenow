const fs = require("fs");
const path = require("path");

function getStudentData() {
  const studentsFile = fs.readFileSync(
    path.join(__dirname, "..", "models", "students.json")
  );
  return JSON.parse(studentsFile);
}

function writeStudentData(students) {
  fs.writeFileSync(
    path.join(__dirname, "..", "models", "students.json"),
    JSON.stringify(students)
  );
}

function getStudents(req, res) {
  const students = getStudentData();
  return res.status(200).json(students);
}

function getStudentById(req, res) {
  const id = req.params.id;
  const students = getStudentData();
  const student = students.find((student) => student.id === id);
  return res.status(200).json(student);
}

function updateStudent(req, res) {
  const id = req.params.id;
  const students = getStudentData();
  const index = students.findIndex((student) => student.id === id);
  students[index] = req.body;
  writeStudentData(students);
  return res.status(200).json(students[index]);
}

function addStudent(req, res) {
  const students = getStudentData();
  const newStudent = { id: crypto.randomUUID(), ...req.body };
  const newStudents = [...students, newStudent];
  writeStudentData(newStudents);
  return res.status(201).json(newStudent);
}

function removeStudent(req, res) {
  const id = req.params.id;
  const students = getStudentData();
  const updatedStudents = students.filter((student) => student.id !== id);
  writeStudentData(updatedStudents);
  return res.status(200).json({});
}

module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
  addStudent,
  removeStudent,
};
