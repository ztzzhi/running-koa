const User = require('../model/user.model')

class UserService {
    async createUser(user_name,password){
        const result = await User.create({
            user_name,
            password
        })
        return result
    }
    async checkUserLogin(user_name,password){
        const result = await User.findOne({
            user_name,
            password
        })
        let res = result.dataValues.user_name ? result.dataValues.user_name : ''
        return res
    }
}

module.exports = new UserService()