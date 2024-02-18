const db = require("../config/db");

// Booking Properties
const sendDeposit = async ({ project_id, email, phone, name }) => {
  const project = await db.Project.findByPk(project_id);
  if (!project) {
    return {
      statusCode: 404,
      error: "Dự án không tồn tại, mời bạn thử lại dữ liệu",
    };
  }
  const booking = await db.Booking.create({
    ProjectId: project_id,
    CustomerEmail: email,
    CustomerName: name,
    CustomerPhoneNumber: phone,
    BookingDate: new Date(Date.now()),
    Status: "Pending",
    IsSelected: 0,
  });
  return booking;
};
module.exports = { sendDeposit };
