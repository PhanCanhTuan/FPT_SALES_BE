const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    investorId: {
      // Sử dụng camelCase cho tên thuộc tính trong Sequelize
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT, // Sử dụng TEXT nếu địa chỉ có thể rất dài
      allowNull: false,
    },
  };

  const options = {
    freezeTableName: true,
    timestamps: false, // Nếu không muốn thêm các cột thời gian tự động
  };

  return sequelize.define("Investor", attributes, options);
}
