const express = require("express");
const router = express.Router();
const propertyService = require("../services/property.service");

// Tạo mới property
router.post("/create-property", async (req, res) => {
  try {
    var response = await propertyService.createProperty(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy danh sách property theo projectId
router.get("/:projectId/list-property-by-projectId", async (req, res) => {
  try {
    var response = await propertyService.getPropertyByProject(
      req.params.projectId
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy property theo propertyId
router.get("/:propertyId/property", async (req, res) => {
  try {
    var response = await propertyService.getPropertyById(req.params.propertyId);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});
module.exports = router;
