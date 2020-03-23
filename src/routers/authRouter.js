const express = require("express");
const teachers = require("../models/teachers");
const { compareHash } = require("../services/hashingService");
const { createToken } = require("../services/jwtService");

const authRouter = express.Router();

authRouter
  .get("/login", (req, res) => {
    res.render("login", {
      layout: "hero"
    });
  })
  .post("/login", (req, res) => {
    const { email, password } = req.body;
    teachers.findOne({ where: { email } }).then(response => {
      if (!response) {
        res.render("login", {
          layout: "hero",
          message: "User Not Registered!",
          messageType: "danger"
        });
      } else {
        const { id, name, password: passwordHash } = response.get();
        compareHash(password, passwordHash)
          .then(result => {
            if (result) {
              const jwtToken = createToken({
                id,
                email,
                name
              });
              res.cookie("jwt", jwtToken, { httpOnly: true });
              res.redirect("/");
            } else {
              res.render("login", {
                layout: "hero",
                message: "Enter the correct password!",
                messageType: "danger"
              });
            }
          })
          .catch(console.error);
      }
    });
  })
  .get("/register", (req, res) => {
    res.render("register", {
      layout: "hero"
    });
  })
  .post("/register", (req, res) => {
    teachers
      .create(req.body)
      .then(result => {
        res.render("login", {
          layout: "hero",
          message: "User Registered Successfully!",
          messageType: "success"
        });
      })
      .catch(e => {
        res.render("login", {
          layout: "hero",
          message: "Registration failed!",
          messageType: "danger"
        });
      });
  })
  .get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
  });

module.exports = authRouter;
