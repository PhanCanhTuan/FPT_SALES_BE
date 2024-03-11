require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // to enable cors

// Routes
app.use("/api/user", require("./controllers/user.controller"));
app.use("/api/customer", require("./controllers/customer.controller"));
app.use("/api/agency", require("./controllers/agency.controller."));
app.use("/api/auth", require("./controllers/auth.controller"));
app.use("/api/booking", require("./controllers/booking.controller"));
app.use("/api/project", require("./controllers/project.controller"));
app.use("/api/investor", require("./controllers/investor.controller"));
app.use("/api/property", require("./controllers/property.controller"));
app.use(
  "/api/openingForSales",
  require("./controllers/openingForSales.controller")
);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server listening on port " + port));
