const db = require("../config/db");

const getAllProject = async () => {
  return await db.Project.findAll();
};

module.exports = {
  getAllProject,
};
