const productsModel = require("../models/products");

class ProductRepos {
  async create(payload) {
    return productsModel.create(payload);
  }
}

export default new ProductRepos();
