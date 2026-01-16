const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDB = require("./db/db.config");
connectToDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const issueRoutes = require("./routes/issue.routes");

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

module.exports = app;
