const express = require("express");
const router = express.Router();
const projectService = require("../services/project.service");

router.get("/", async (req, res) => {
  try {
    var projects = await projectService.getAllProject();
    res.status(200).json({
      status: 200,
      message: "Project founded successfully",
      data: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
