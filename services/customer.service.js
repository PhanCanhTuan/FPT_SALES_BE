const db = require("../config/db");

const getAllCustomer = async () => {
  return await db.CustomerModel.findAll({
    include: [db.UserModel],
    attributes: { exclude: ["Password"] }, // Loại bỏ trường Password từ UserModel
  });
};

module.exports = {
  getAllCustomer,
};
