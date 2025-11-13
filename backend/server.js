import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import path from "path";
import errorHandler from "./middlewares/errorHandler.js";
import ConnectDb from "./config/db.js";
import cors from 'cors';

import productRoute from "./routes/product.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
ConnectDb();

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(morgan("common"));
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// API Routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

// Error handler
app.use(errorHandler);

// Start server
const port = process.env.NODE_PORT || 5050;
app.listen(port, () => {
  console.log(`App is running in ${process.env.NODE_MODE} mode at ${port} port.`.bgGreen);
});
