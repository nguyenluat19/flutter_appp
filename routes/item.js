const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Endpoint để lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để thêm sản phẩm
router.post("/add", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ error: "Thiếu dữ liệu sản phẩm" });
    }

    const newItem = new Product({ name, price, description, imageUrl });
    await newItem.save();
    res.status(201).json({ message: "Thêm sản phẩm thành công", newItem });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm" });
  }
});

// Endpoint để sửa sản phẩm
router.put("/update/:id", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Cập nhật sản phẩm thành công", updatedProduct });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm" });
  }
});

// Endpoint để xóa sản phẩm
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm" });
  }
});

module.exports = router;
