const express = require("express");
const studentsController = require("./controllers/students.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/students", studentsController.getStudents);
app.get("/students/:id", studentsController.getStudentById);
app.put("/students/:id", studentsController.updateStudent);
app.post("/students", studentsController.addStudent);
app.delete("/students/:id", studentsController.removeStudent);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
