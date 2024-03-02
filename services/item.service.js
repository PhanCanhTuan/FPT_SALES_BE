const db = require("../config/db");

const getAllItems = async () => {
  return await db.Item.findAll();
};

module.exports = {
  getAllItems,
};
