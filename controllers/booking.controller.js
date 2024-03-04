const express = require("express");
const router = express.Router();
const bookingService = require("../services/booking.service");

router.post("/deposit", async (req, res) => {
  try {
    var response = await bookingService.depositProject(req.body);
    res.status(response.status).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy các booking đang pedding
router.get("/pending", async (req, res) => {
  try {
    var response = await bookingService.getBookingPedding();
    res.status(response.status).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Thay đổi trạng thái của booking thành approved
router.put("/approve/:bookingId", async (req, res) => {
  try {
    var response = await bookingService.approveBooking(req.params.bookingId);
    res.status(response.status).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy 1 booking cụ thể theo bookingID
router.get("/:bookingId", async (req, res) => {
  try {
    var response = await bookingService.getBookingById(req.params.bookingId);
    res.status(response.status).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy ra những booking nào có trạng thái là approved
router.get("/list-approved", async (req, res) => {
  try {
    var response = await bookingService.getBookingApproved();
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy tất cả các booking
router.get("/", async (req, res) => {
  try {
    var response = await bookingService.getAllBooking();
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
