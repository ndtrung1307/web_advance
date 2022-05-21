const { validationResult } = require("express-validator");

import productRepos from "../repos/products";
import fs from "fs";
import path from "path";

class ProductController {
  async store(req, res) {
    console.log("Authorization payload: ", req.userClaims);

    console.log("req.file: ", req.file);

    const image = {
      data: fs.readFileSync(
        path.join(__dirname + "/../../uploads/" + req.file.filename)
      ),
      imgType: req.file.mimetype,
    };

    console.log("Image: ", image);

    const { code, name, description } = req.body;

    const createResult = await productRepos.create({
      image,
      code,
      name,
      description,
    });

    fs.unlinkSync(path.join(__dirname + "/../../uploads/" + req.file.filename));

    res.setHeader("Content-Type", "application/json");
    res.status(201);
    return res.json({ result: createResult });
  }

  async list(req, res) {
    return res.json({ message: "API List Products!" });
  }
}
export default new ProductController();
