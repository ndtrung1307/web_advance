const express = require("express");

const FileController = require("../controllers/FileController");

const router = express.Router();

router.get("/", FileController.index);

router.get("/:link", FileController.move);
router.get("/folders/:link", FileController.downloadFolder);

router.post("/", FileController.store);

router.post("/upload", FileController.save);
router.put("/:link", FileController.editName);
router.delete("/:link", FileController.destroy);

module.exports = router;
