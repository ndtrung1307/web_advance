const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "./uploads" });
const deleteTemporaryImage = (name) => fs.unlinkSync("./uploads/" + name);

module.exports = { upload, deleteTemporaryImage };
