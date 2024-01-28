const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    investor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Investor",
        key: "investor_id",
      },
    },
  };

  const options = {
    freezeTableName: true,
    // Không thêm các thuộc tính thời gian (updatedAt, createdAt)
    timestamps: false,
  };

  return sequelize.define("Project", attributes, options);
}
