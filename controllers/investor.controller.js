const express = require("express");
const router = express.Router();
const investorService = require("../services/investor.service");

// 1. Tạo đợt mở bán cho dự án
router.post("/opening-for-sale", async (req, res) => {
  try {
    var response = await investorService.createOpeningForSale(
      req.body.projectId,
      req.body.startTime,
      req.body.endTime
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});
module.exports = router;
