const { context } = require("../app");
const User = require("../model/user.model");

class UserService {
  async createUser (user_name, password) {
    const result = await User.create({
      user_name,
      password,
    });
    return result;
  }

  async getUserInfo ({ id, user_name, password }) {
    const opt = {};
    id && Object.assign(opt, { id });
    user_name && Object.assign(opt, { user_name });
    password && Object.assign(opt, { password });
    const result = await User.findOne({
      attributes: ["id", "user_name", "password"],
      where: opt,
    });
    console.log(result);
    return result ? result.dataValues : null;
  }

  async updateById (obj) {
    const { user_name, id, password } = obj
    const opt = { id }
    const newOpt = {}
    user_name && Object.assign(newOpt, { user_name })
    id && Object.assign(newOpt, { id })
    password && Object.assign(newOpt, { password })

    try {
      const res = await User.update(newOpt,{where:opt})
      return res
    } catch (error) {
      console.error(error)
    }
    
  }

  async deleteById(obj){
    console.log(obj);
    const {id} = obj
    const whereOpt = { id }
    try {
      const res = await User.destroy({where:whereOpt})
      if(res==1){
        return res
      }else{
        console.error('删除失败')
      }
    } catch (error) {
      console.error(error)
    }
    
  }
}

module.exports = new UserService();
