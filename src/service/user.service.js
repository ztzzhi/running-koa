const User = require("../model/user.model");

class UserService {
  async createUser(user_name, password) {
    const result = await User.create({
      user_name,
      password,
    });
    return result;
  }

  async getUserInfo({ id, user_name, password }) {
    const opt = {};
    id && Object.assign(opt, { id });
    user_name && Object.assign(opt, { user_name });
    password && Object.assign(opt, { password });
    const result = await User.findOne({
      attributes: ["id", "user_name", "password"],
      where: opt,
    });
    return result ? result.dataValues : null;
  }
}

module.exports = new UserService();
