const express = require("express");
const router = express.Router();
const openingForSalesService = require("../services/openingForSales.service");

// Lấy thông tin các đợt mở bán của dự án
router.get("/:projectId", async (req, res) => {
  try {
    var response = await openingForSalesService.getOpeningForSalesByProject(
      req.params.projectId
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
