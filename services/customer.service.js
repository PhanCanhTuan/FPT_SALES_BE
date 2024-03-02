const db = require("../config/db");

const getAllCustomer = async () => {
  return await db.CustomerModel.findAll({
    include: [db.UserModel],
    attributes: { exclude: ["Password"] }, // Loại bỏ trường Password từ UserModel
  });
};

// Lấy danh sách booking của customer
const getBookingByCustomer = async (CustomerId) => {
  const response = await db.BookingModel.findAll({
    where: { CustomerId: CustomerId },
    include: [db.AgencyModel, db.ProjectModel],
  });

  return {
    status: 200,
    message: "Lấy danh sách booking của Customer thành công",
    data: response,
  };
};

module.exports = {
  getAllCustomer,
  getBookingByCustomer,
};
