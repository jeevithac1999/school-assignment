const sequelize = require("sequelize");

const ClassDb = new sequelize(process.env.db);

ClassDb.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(e => {
    console.log("Sorry database not connected!!!");
    console.error(e);
  });

module.exports = ClassDb;
