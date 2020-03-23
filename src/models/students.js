const sequelize = require("sequelize");
const db = require("../config/ClassDb");
const teachers = require("./teachers");

const students = db.define("students", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  regno:{
    type:sequelize.STRING,
    allowNull:false
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  age: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: sequelize.ENUM,
    allowNull: false,
    values: ["Male", "Female"]
  },
  class: {
    type: sequelize.ENUM,
    allowNull: false,
    values: ["LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"]
  },
  teacher_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: teachers,
      key: "id",
      deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

students.sync({ force: false });

module.exports = students;
