const db = require("../config/db");

const getAll = async () => {
  return await db.Property.findAll();
};

const findPropertyById = async (property_id) => {
  return await db.Property.findByPk(property_id);
};

module.exports = {
  getAll,
  findPropertyById,
  bookingProperty,
};
