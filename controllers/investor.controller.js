const express = require("express");
const router = express.Router();
const investorService = require("../services/investor.service");

router.get("/", async (req, res) => {
  try {
    var investors = await investorService.getAllInvestor();
    res.status(200).json({
      status: 200,
      message: "Lấy thành công tất cả nhà đầu tư",
      data: investors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
