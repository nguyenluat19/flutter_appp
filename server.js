const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const itemRoutes = require('./routes/item'); // Import routes cho item

dotenv.config(); // Đọc biến môi trường từ .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Phân tích dữ liệu JSON từ body của request

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Định nghĩa các routes
app.use("/api/items", itemRoutes); // Route cho item
app.use("/api/auth", authRoutes); // Route cho authentication
app.use("/api/products", productRoutes); // Route cho sản phẩm

// Root endpoint để kiểm tra
app.get("/", (req, res) => {
  res.send("API is working");
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
