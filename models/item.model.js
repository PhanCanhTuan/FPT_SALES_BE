const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  const options = {
    freezeTableName: true,
    // Không thêm các thuộc tính thời gian (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Items", attributes, options);
}
