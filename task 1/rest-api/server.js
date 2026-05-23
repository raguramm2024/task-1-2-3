const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(logger);
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});