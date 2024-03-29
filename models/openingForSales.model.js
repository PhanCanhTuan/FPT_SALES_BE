const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OpeningForSales = sequelize.define(
    "OpeningForSales",
    {
      OpeningForSalesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      StartDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      EndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  OpeningForSales.belongsTo(sequelize.models.Project, {
    foreignKey: "ProjectId",
  });

  return OpeningForSales;
};
