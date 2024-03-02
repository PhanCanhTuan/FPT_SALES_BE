const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Role: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return User;
};
