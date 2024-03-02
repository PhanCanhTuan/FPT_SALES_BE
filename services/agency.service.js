const db = require("../config/db");

const getAllAgency = async () => {
  return await db.AgencyModel.findAll({
    include: [db.UserModel],
  });
};

module.exports = {
  getAllAgency,
};
