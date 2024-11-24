
const express = require('express');
const Item = require('../models/Item'); // Đảm bảo bạn đã định nghĩa schema Item trong models
const router = express.Router();

// Endpoint để thêm sản phẩm
router.post("/add", async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ error: "Thiếu dữ liệu sản phẩm" });
    }

    const newItem = new Item({ name, price, imageUrl });
    await newItem.save();
    res.status(201).json({ message: "Thêm sản phẩm thành công", newItem });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm" });
  }
});

// Bạn có thể thêm các route khác như sửa hoặc xóa sản phẩm ở đây.

module.exports = router;
