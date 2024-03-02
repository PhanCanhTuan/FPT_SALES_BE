const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentProcessDetail = sequelize.define(
    "PaymentProcessDetail",
    {
      PaymentProcessDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PaymentProcessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PaymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  PaymentProcessDetail.belongsTo(sequelize.models.PaymentProcess, {
    foreignKey: "PaymentProcessId",
  });

  return PaymentProcessDetail;
};
