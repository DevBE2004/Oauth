const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Auth", "postgres", "310304", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  timezone: "+07:00",
});

const dbconnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection DB successfully.");
  } catch (error) {
    console.error("Connection DB failed.");
  }
};
module.exports = dbconnect;
