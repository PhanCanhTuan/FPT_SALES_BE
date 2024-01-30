const db = require("../config/db");

// Booking Properties
const sendDeposit = async ({ property_id, email, phone, deposit }) => {
  const property = await db.Property.findByPk(property_id);
  if (!property) {
    return {
      statusCode: 404,
      error: "Property does not exist",
    };
  }
  const booking = await db.Booking.create({
    property_id,
    email,
    opening_id: null,
    customer_id: null,
    phone,
    deposit_amount: deposit,
    status: "pending",
    booking_date: new Date(),
  });
  return booking;
};
module.exports = { sendDeposit };
