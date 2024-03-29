const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Investor = sequelize.define(
    "Investor",
    {
      InvestorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      PhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Investor.belongsTo(sequelize.models.User, { foreignKey: "UserId" });

  return Investor;
};
