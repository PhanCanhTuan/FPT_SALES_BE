require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // to enable cors

app.use("/api/property", require("./controllers/property.controller"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server listening on port " + port));
