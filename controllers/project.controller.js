const express = require("express");
const router = express.Router();
const projectService = require("../services/project.service");

router.get("/", async (req, res) => {
  try {
    var projects = await projectService.getAllProject();
    res.status(200).json({
      status: 200,
      message: "Lấy toàn bộ dự án hiện có thành công",
      data: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy dự án theo project_id
router.get("/:id", async (req, res) => {
  try {
    var project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Dự án không tồn tại" });
    }
    return res.status(200).json({
      status: 200,
      message: "Lấy dự án thành công",
      data: project,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
