const db = require("../config/db");

// Lấy tất cả các dự án hiện tại
const getAllProjects = async () => {
  const listProjects = await db.ProjectModel.findAll({
    include: [db.InvestorModel],
  });
  return {
    status: 200,
    message: "Lấy thành công tất cả dự án",
    data: listProjects,
  };
};

// Lấy dự án theo ProjectId
const getProjectById = async (projectId) => {
  const project = await db.ProjectModel.findByPk(projectId, {
    include: [db.InvestorModel],
  });
  if (!project) {
    return {
      status: 404,
      message: "Dự án không tồn tại",
    };
  }
  return {
    status: 200,
    message: "Lấy dự án thành công",
    data: project,
  };
};

module.exports = {
  getAllProjects,
  getProjectById,
};
