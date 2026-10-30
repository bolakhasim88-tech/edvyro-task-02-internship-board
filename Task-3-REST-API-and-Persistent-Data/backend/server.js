
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./db");
const internshipRoutes = require("./routes/internshipRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/internships", internshipRoutes);

const PORT = process.env.PORT || 4000;

// Test API route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Internship API is working!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
