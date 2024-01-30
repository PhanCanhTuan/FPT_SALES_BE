const express = require("express");
const router = express.Router();
const itemService = require("../services/item.service");

router.get("/", async (req, res) => {
  try {
    var items = await itemService.getAllItems();
    res.status(200).json({
      status: 200,
      message: "Get list items successfully",
      data: items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;
