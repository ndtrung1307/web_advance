const productsModel = require("../models/products");

class ProductRepos {
  async create(payload) {
    return productsModel.create(payload);
  }
}

module.exports = new ProductRepos();
