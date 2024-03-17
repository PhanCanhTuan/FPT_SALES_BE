const { Sequelize } = require("sequelize");
const userModel = require("../models/user.model");
const agencyModel = require("../models/agency.model");
const customerModel = require("../models/customer.model");
const investorModel = require("../models/investor.model");
const projectModel = require("../models/project.model");
const propertyModel = require("../models/property.model");
const openingForSalesModel = require("../models/openingForSales.model");
const openingForSalesDetailModel = require("../models/openingForSalesDetail.model");
const bookingModel = require("../models/booking.model");
const paymentProcess = require("../models/paymentProcess.model");
const paymentProcessDetail = require("../models/paymentProcessDetail.model");
const agencyProjectModel = require("../models/agencyProject.model");
const paymentOptionModel = require("../models/paymentOption.model");
const PaymentOptionForProjectModel = require("../models/paymentOptionForProject.model");

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

db.sequelize = sequelize;

db.UserModel = userModel(sequelize);
db.CustomerModel = customerModel(sequelize);
db.InvestorModel = investorModel(sequelize);
db.AgencyModel = agencyModel(sequelize);
db.ProjectModel = projectModel(sequelize);
db.PropertyModel = propertyModel(sequelize);
db.OpeningForSalesModel = openingForSalesModel(sequelize);
db.OpeningForSalesDetailModel = openingForSalesDetailModel(sequelize);
db.BookingModel = bookingModel(sequelize);
db.PaymentProcessModel = paymentProcess(sequelize);
db.PaymentProcessDetailModel = paymentProcessDetail(sequelize);
db.AgencyProjectModel = agencyProjectModel(sequelize);
db.PaymentOptionModel = paymentOptionModel(sequelize);
db.PaymentOptionForProjectModel = PaymentOptionForProjectModel(sequelize);

// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
