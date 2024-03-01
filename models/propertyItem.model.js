const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    propertyItem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const options = {
    freezeTableName: true,
    // Không thêm các thuộc tính thời gian (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("PropertyItems", attributes, options);
}
