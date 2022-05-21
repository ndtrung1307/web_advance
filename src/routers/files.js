import express from "express";

import FileController from "../controllers/FileController";

const router = express.Router();

router.get("/", FileController.index);

router.get("/:link", FileController.move);
router.get("/folders/:link", FileController.downloadFolder);

router.post("/", FileController.store);

router.post("/upload", FileController.save);
router.put("/:link", FileController.editName);
router.delete("/:link", FileController.destroy);

export default router;
