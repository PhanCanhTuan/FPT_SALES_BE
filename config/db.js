const { Sequelize } = require("sequelize");
const propertyModel = require("../models/property.model");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: 1433,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {};
db.Property = propertyModel(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
