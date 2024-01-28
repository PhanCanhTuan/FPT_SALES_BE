const { Sequelize } = require("sequelize");
const propertyModel = require("../models/property.model");
const projectModel = require("../models/project.model");
const itemModel = require("../models/item.model");
const propertyItemModel = require("../models/propertyItem.model");
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
db.Project = projectModel(sequelize);
db.Item = itemModel(sequelize);
db.PropertyItem = propertyItemModel(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
