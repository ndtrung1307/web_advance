const multer = require("multer");
import fs from "fs";
const upload = multer({ dest: "./uploads" });
const deleteTemporaryImage = (name) => fs.unlinkSync("./uploads/" + name);

module.exports = { upload, deleteTemporaryImage };
