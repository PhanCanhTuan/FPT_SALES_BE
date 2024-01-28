const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apartment_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };

  const options = {
    freezeTableName: true,
    // Không thêm các thuộc tính thời gian (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Property", attributes, options);
}
