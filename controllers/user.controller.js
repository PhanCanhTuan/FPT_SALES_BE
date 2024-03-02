const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");

router.get("/", async (req, res) => {
  try {
    var users = await userService.getAllUser();
    res.status(200).json({
      status: 200,
      message: "Lấy thành công tất cả tài khoản",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
