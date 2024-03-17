const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentOptionForProject = sequelize.define(
    "PaymentOptionForProject",
    {
      PaymentOptionForProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Thể hiện phương thức thanh toán
      PaymentMethod: {
        // Tên mới của trường bạn muốn thêm
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PaymentOptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  PaymentOptionForProject.belongsTo(sequelize.models.Project, {
    foreignKey: "ProjectId",
  });
  PaymentOptionForProject.belongsTo(sequelize.models.PaymentOption, {
    foreignKey: "PaymentOptionId",
  });

  return PaymentOptionForProject;
};
