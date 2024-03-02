const { Sequelize } = require("sequelize");
const propertyModel = require("../models/property.model");
const itemModel = require("../models/item.model");
const propertyItemModel = require("../models/propertyItem.model");
const openingForSalesModel = require("../models/openingForSales.model");
const investorModel = require("../models/investor.model");
const projectModel = require("../models/project.model");
const bookingModel = require("../models/booking.model");

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
// db.Property = propertyModel(sequelize);
// db.Item = itemModel(sequelize);
// db.PropertyItem = propertyItemModel(sequelize);
// db.OpeningForSales = openingForSalesModel(sequelize);
db.Investor = investorModel(sequelize);
db.Project = projectModel(sequelize);
db.Booking = bookingModel(sequelize);

// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
