
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    },
    standardHeaders: "draft-7",
    legacyHeaders: false
});

app.use("/api", apiLimiter);

const db = require("./db");
const internshipRoutes = require("./routes/internshipRoutes");

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
