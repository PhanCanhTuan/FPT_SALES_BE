const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Agency = sequelize.define(
    "Agency",
    {
      AgencyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Agency.belongsTo(sequelize.models.User, { foreignKey: "UserId" });

  return Agency;
};
