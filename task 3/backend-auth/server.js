import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;
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

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Auth service running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend auth server running on port ${PORT}`);
});
