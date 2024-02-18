const db = require("../config/db");

const getAllInvestor = async () => {
  return await db.Investor.findAll();
};

module.exports = {
  getAllInvestor,
};
