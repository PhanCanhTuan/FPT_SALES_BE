const { DataTypes } = require("sequelize");

module.exports = (sequelize, models) => {
  // Thêm tham số models vào hàm export
  const AgencyProject = sequelize.define(
    "AgencyProject",
    {
      AgencyProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Các trường khóa ngoại
      AgencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  // Thiết lập mối quan hệ: Mỗi Agency có nhiều AgencyProject
  sequelize.models.Agency.hasMany(AgencyProject, {
    foreignKey: "AgencyId",
  });

  // Thiết lập mối quan hệ: Mỗi AgencyProject thuộc về một Agency
  AgencyProject.belongsTo(sequelize.models.Agency, {
    foreignKey: "AgencyId",
  });

  // Thiết lập mối quan hệ: Mỗi Project có nhiều AgencyProject
  sequelize.models.Project.hasMany(AgencyProject, {
    foreignKey: "ProjectId",
  });

  // Thiết lập mối quan hệ: Mỗi AgencyProject thuộc về một Project
  AgencyProject.belongsTo(sequelize.models.Project, {
    foreignKey: "ProjectId",
  });

  return AgencyProject;
};
