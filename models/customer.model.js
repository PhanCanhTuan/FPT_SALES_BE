const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Customer = sequelize.define(
    "Customer",
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      FullName: {
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
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Customer.belongsTo(sequelize.models.User, { foreignKey: "UserId" });

  return Customer;
};
