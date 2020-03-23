const express = require("express");
const teachers = require("../models/teachers");

const teachersRouter = express.Router();

teachersRouter.get("/", async (req, res) => {
  var teachersList = [];
  await teachers.findAll().then(response => {
    response.forEach(item => teachersList.push(item.get()));
  });
  res.render("teachers", {
    layout: "navigation",
    teachers: teachersList
  });
});

module.exports = teachersRouter;
