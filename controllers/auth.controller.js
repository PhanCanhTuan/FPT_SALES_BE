const express = require("express");
const router = express.Router();
const authService = require("../services/auth.service");

// Xử lí đăng kí tài khoản và jwt
router.post("/register", async (req, res) => {
  try {
    var response = await authService.register(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Xử lí đăng nhập tài khoản và jwt
router.post("/login", async (req, res) => {
  try {
    var response = await authService.login(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
