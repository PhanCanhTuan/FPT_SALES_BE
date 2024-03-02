const db = require("../config/db");

const getAllUser = async () => {
  return await db.UserModel.findAll();
};

module.exports = {
  getAllUser,
};
