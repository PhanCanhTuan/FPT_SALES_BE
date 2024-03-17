const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentOption = sequelize.define(
    "PaymentOption",
    {
      PaymentOptionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Batch: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Percentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Date: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Note: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return PaymentOption;
};
