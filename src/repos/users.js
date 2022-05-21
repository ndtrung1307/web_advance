const usersModel = require("../models/user");

class UserRepos {
  async create(payload) {
    return usersModel.create(payload);
  }

  async getByUsername(username) {
    return usersModel.findOne({ username });
  }
}

module.exports = new UserRepos();
