import express from "express";
import ProductController from "../controllers/productController";
const { upload } = require("../multer");

const router = express.Router();

router.post("/products", upload.single("image"), ProductController.store);
router.get("/products", ProductController.list);

export default router;
