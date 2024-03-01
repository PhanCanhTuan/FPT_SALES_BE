const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Project = sequelize.define(
    "Project",
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      InvestorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      NumberOfApartments: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      NumberOfShops: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      LandArea: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ConstructionDensity: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      StartDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      EndDate: {
        type: DataTypes.DATE,
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

  Project.belongsTo(sequelize.models.Investor, { foreignKey: "InvestorId" });

  return Project;
};
