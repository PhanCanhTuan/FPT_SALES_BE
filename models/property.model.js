const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Property = sequelize.define(
    "Property",
    {
      PropertyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      Floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ApartmentNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ShopNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Area: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Price: {
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

  Property.belongsTo(sequelize.models.Project, { foreignKey: "ProjectId" });

  return Property;
};
