const mongoose = require("../db");

var product = mongoose.model("products", {
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    data: { type: Buffer, required: true },
    imgType: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = product;
