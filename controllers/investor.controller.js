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

// 2. Tạo phương án thanh toán cho dự án
router.post("/payment-option-for-project", async (req, res) => {
  try {
    var response = await investorService.createPaymentOptionForProject(
      req.body.projectId,
      req.body.paymentMethod,
      req.body.paymentOptions
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// 3. Lấy danh sách các phương án thanh toán của dự án
router.get("/payment-options/:projectId", async (req, res) => {
  try {
    var response = await investorService.getPaymentOptionsForProject(
      req.params.projectId
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// 4. Cập nhật phương án thanh toán
router.put("/payment-option/:paymentOptionId", async (req, res) => {
  try {
    var response = await investorService.updatePaymentOption(
      req.params.paymentOptionId,
      req.body
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// 5. Xóa phương án thanh toán
router.delete("/payment-option", async (req, res) => {
  try {
    var response = await investorService.deletePaymentOption(
      req.body.projectId,
      req.body.paymentMethod
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// 6. Cập nhật thông tin Project
router.put("/project/:projectId", async (req, res) => {
  try {
    var response = await investorService.updateProject(
      req.params.projectId,
      req.body
    );
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});
module.exports = router;
