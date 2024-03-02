const express = require("express");
const router = express.Router();
const agencyService = require("../services/agency.service");

router.get("/", async (req, res) => {
  try {
    var agencies = await agencyService.getAllAgency();
    res.status(200).json({
      status: 200,
      message: "Lấy thành công danh sách đại lý",
      data: agencies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy danh sách booking thuộc về Agency
router.get("/:AgencyId/booking", async (req, res) => {
  try {
    var bookings = await agencyService.getBookingByAgency(req.params.AgencyId);
    res.status(bookings.status).json({
      status: 200,
      message: "Lấy thành công danh sách booking thuộc về Agency",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
