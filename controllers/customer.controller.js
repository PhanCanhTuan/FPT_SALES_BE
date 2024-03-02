const express = require("express");
const router = express.Router();
const customerService = require("../services/customer.service");

router.get("/", async (req, res) => {
  try {
    var customers = await customerService.getAllCustomer();
    res.status(200).json({
      status: 200,
      message: "Lấy thành công danh sách khách hàng",
      data: customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Lấy danh sách booking của customer
router.get("/:CustomerId/booking", async (req, res) => {
  try {
    var bookings = await customerService.getBookingByCustomer(
      req.params.CustomerId
    );
    res.status(bookings.status).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
