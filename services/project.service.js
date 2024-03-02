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

// Lấy tất cả danh sách agency theo dự án
const getAgencyByProject = async (projectId) => {
  const response = await db.AgencyProjectModel.findAll({
    include: [
      {
        model: db.ProjectModel,
        where: { ProjectId: projectId },
      },
      db.AgencyModel,
    ],
  });

  return {
    status: 200,
    message: "Lấy danh sách agency theo dự án thành công",
    data: response,
  };
};

module.exports = {
  getAllProjects,
  getProjectById,
  getAgencyByProject,
};
