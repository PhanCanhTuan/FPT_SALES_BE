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

const updateCustomer = async (userId, {
  fullName,
  email,
  phoneNumber,
  address
}) => {
  let customer = await db.CustomerModel.findOne({
    where: { UserId: userId },
  });

  if(!customer){
    return {
      status: 404,
      message: "Customer not found"
    }
  }

  customer.FullName= fullName ?? customer.FullName,
  customer.Email= email ?? customer.Email,
  customer.PhoneNumber= phoneNumber ?? customer.PhoneNumber,
  customer.Address= address ?? customer.Address,

  await customer.save();
  return {
    status: 200,
    message: "Update customer successfully"
  }
}

module.exports = {
  getAllCustomer,
  getBookingByCustomer,
  updateCustomer
};
