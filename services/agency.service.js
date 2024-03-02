const db = require("../config/db");

const getAllAgency = async () => {
  return await db.AgencyModel.findAll({
    include: [db.UserModel],
  });
};

// Lấy danh sách bookong thuộc về Angency
const getBookingByAgency = async (AgencyId) => {
  const response = await db.BookingModel.findAll({
    where: { AgencyId: AgencyId },
    include: [db.CustomerModel, db.ProjectModel],
  });

  // Return response và message
  return {
    status: 200,
    message: "Lấy danh sách booking thuộc về Agency thành công",
    data: response,
  };
};

module.exports = {
  getAllAgency,
  getBookingByAgency,
};
