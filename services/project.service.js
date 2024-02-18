const db = require("../config/db");

const getAllProject = async () => {
  return await db.Project.findAll({
    include: [db.Investor], // Thêm include để lấy thông tin của Investor
  });
};

const getProjectById = async (project_id) => {
  return await db.Project.findByPk(project_id, {
    include: [db.Investor], // Thêm include để lấy thông tin của Investor
  });
};

module.exports = {
  getAllProject,
  getProjectById,
};
