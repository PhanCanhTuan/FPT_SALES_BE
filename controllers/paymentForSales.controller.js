const express = require("express");
const router = express.Router();
const paymentForSales = require("../services/paymentForSales.service");

// Cập nhật trạng thái paymentProcessDetail
router.put("/:paymentProcessDetailId", async (req, res) => {
  try {
    var response = await paymentForSales.changePaymentStatus(
      req.params.paymentProcessDetailId
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
