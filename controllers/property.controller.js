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
module.exports = router;
