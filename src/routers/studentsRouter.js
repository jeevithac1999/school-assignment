const express = require("express");
const students = require("../models/students");
const { validateToken } = require("../services/jwtService");

const studentsRouter = express.Router();

studentsRouter
  .get("/", async (req, res) => {
    var { id: teacher_id } = validateToken(req.cookies.jwt);
    var studentsList = [];
    await students
      .findAll({ where: { teacher_id } })
      .then(response => {
        response.forEach(item => studentsList.push(item.get()));
      })
      .catch(console.error);
    res.render("home", {
      layout: "navigation",
      students: studentsList,
      is_admin: true
    });
  })
  .get("/new", (req, res) => {
    res.render("student_form", {
      layout: "navigation",
      formMode: "Add"
    });
  })
  .post("/new", (req, res) => {
    var { id: teacher_id } = validateToken(req.cookies.jwt);
    students
      .create({ ...req.body, teacher_id })
      .then(response => {
        res.redirect("/students");
      })
      .catch(console.error);
  })
  .get("/edit/:id", async (req, res) => {
    await students.findOne({ where: { id: req.params.id } }).then(response => {
      res.render("student_form", {
        layout: "navigation",
        student: response.get(),
        formMode: "Edit"
      });
    });
  })
  .post("/edit/:id", (req, res) => {
    students
      .findOne({ where: { id: req.params.id } })
      .then(response => {
        response.update(req.body);
        res.redirect("/students");
      })
      .catch(console.error);
  })
  .get("/delete/:id", (req, res) => {
    students
      .destroy({ where: { id: req.params.id } })
      .then(response => {
        res.redirect("/students");
      })
      .catch(console.error);
  })
  .get("/:teacher_id", async (req, res) => {
    var { id: current_user_id } = validateToken(req.cookies.jwt);
    var { teacher_id } = req.params;
    var studentsList = [];
    await students
      .findAll({ where: { teacher_id } })
      .then(response => {
        response.forEach(item => studentsList.push(item.get()));
      })
      .catch(console.error);
    res.render("home", {
      layout: "navigation",
      students: studentsList,
      is_admin: current_user_id.toString() === teacher_id
    });
  });

module.exports = studentsRouter;
