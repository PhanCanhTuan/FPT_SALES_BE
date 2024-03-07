const express = require("express");
const router = express.Router();
const projectService = require("../services/project.service");

router.get("/", async (req, res) => {
  try {
    var response = await projectService.getAllProjects();
    res.status(response.status).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy dự án theo projectId
router.get("/:projectId", async (req, res) => {
  try {
    var response = await projectService.getProjectById(req.params.projectId);
    res.status(response.status).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy danh sách agency theo dự án
router.get("/:projectId/agency", async (req, res) => {
  try {
    var response = await projectService.getAgencyByProject(
      req.params.projectId
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Tạo một project mới
router.post("/create-project", async (req, res) => {
  try {
    var response = await projectService.createProject(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
