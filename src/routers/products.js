const express = require("express");
const ProductController = require("../controllers/productController");
const { upload } = require("../multer");

const router = express.Router();

router.post("/products", upload.single("image"), ProductController.store);
router.get("/products", ProductController.list);

module.exports = router;
