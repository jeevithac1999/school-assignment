const sequelize = require("sequelize");
const db = require("../config/ClassDb");
const { generateHashSync } = require("../services/hashingService");

const teachers = db.define(
  "teachers",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    email: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    setterMethods: {
      password(plainPassword) {
        this.setDataValue("password", generateHashSync(plainPassword));
      }
    }
  }
);

teachers.sync({ force: false });

module.exports = teachers;
