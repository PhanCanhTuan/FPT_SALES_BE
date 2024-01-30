const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    opening_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true, // Email can be nullable
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true, // Phone can be nullable
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deposit_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  };

  const options = {
    freezeTableName: true,
    // Không thêm các thuộc tính thời gian (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Bookings", attributes, options);
}
