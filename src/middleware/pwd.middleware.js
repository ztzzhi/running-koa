const bcrypt = require('bcryptjs')

const { SALT , JWTSECRET } = require('../config/config.default')

const {getUserInfo} = require('../service/user.service')

const jwtTokenCheck = async (ctx,next) => {
    
}


const bcryptPassword = async (ctx,next) => {

    const {password} = ctx.request.body

    const salt = bcrypt.genSaltSync(SALT)

    // hash保存的是密文
    const hash = bcrypt.hashSync(password , salt)

    ctx.request.body.password = hash
    
    await next()

}

const vertifyPassword = async (ctx,next) => {
    const { user_name, password } = ctx.request.query;
    try {
      const res = await getUserInfo({ user_name });
      if (!res) {
        ctx.app.emit(
            "error",
            {
              code: 400,
              msg: "用户登录失败,请检查用户名和密码",
              result: "",
            },
            ctx
          );
        return;
      }
      if(!bcrypt.compareSync(password,res.password)){
        ctx.app.emit(
            "error",
            {
              code: 400,
              msg: "用户登录失败,请检查用户名和密码",
              result: "",
            },
            ctx
          );
        return;
    }
    } catch (error) {
      ctx.app.emit("error", {
        code: 500,
        msg: "登录异常",
        result: "",
      });
    }
    await next()
}

module.exports = {
    bcryptPassword,
    vertifyPassword
}