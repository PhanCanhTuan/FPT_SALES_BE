const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OpeningForSalesDetail = sequelize.define(
    "OpeningForSalesDetail",
    {
      OpeningForSalesDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OpeningForSalesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PropertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  OpeningForSalesDetail.belongsTo(sequelize.models.OpeningForSales, {
    foreignKey: "OpeningForSalesId",
  });
  OpeningForSalesDetail.belongsTo(sequelize.models.Property, {
    foreignKey: "PropertyId",
  });

  return OpeningForSalesDetail;
};
