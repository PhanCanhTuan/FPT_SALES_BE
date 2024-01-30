const express = require("express");
const router = express.Router();
const bookingService = require("../services/booking.service");

router.post("/sendDeposit", async (req, res) => {
  try {
    var bookingDeposit = await bookingService.sendDeposit(req.body);
    res.status(200).json({
      status: 200,
      message: "Booking deposit successfully",
      data: bookingDeposit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
