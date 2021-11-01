const {createUser,checkUserLogin} = require('../service/user.service')

class UserController {
    async register(ctx,next){
        const {user_name,password} = ctx.request.body
        const res = await createUser(user_name,password)
        ctx.body = res
    }
    async login(ctx,next){
        const {user_name,password} = ctx.request.query
        const res = await checkUserLogin(user_name,password)
        if(res){
            ctx.body = {
                code:200,
                msg:'欢迎登录'+res
            }
        }else{
            ctx.body = {
                code:403,
                msg:'用户登录失败'
            }
        }
    }
}

module.exports = new UserController()