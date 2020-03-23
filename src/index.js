const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const path = require("path");

const authRouter = require("./routers/authRouter");
const teachersRouter = require("./routers/teachersRouter");
const studentsRouter = require("./routers/studentsRouter");
const auth = require("./middlewares/auth");
const current_user = require("./views/helpers/current_user");
const ifEquality = require("./views/helpers/ifEquality");

const app = express();
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    current_user,
    ifEquality
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.redirect("/students");
});

app.use((req, res, next) => {
  res.locals.req = req;
  next();
});

app.use("/teachers", auth, teachersRouter);
app.use("/students", auth, studentsRouter);
app.use("/auth", authRouter);

const server = app.listen(8080, (request, response) => {
  console.log(`Server running on port ${server.address.port}.`);
});