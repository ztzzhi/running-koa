const { createUser, getUserInfo } = require("../service/user.service");

class UserController {
  // 用户注册
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    if (!user_name || !password) {
      console.error("用户名或密码为空");
      ctx.status = 400;
      ctx.app.emit(
        "error",
        {
          code: 400,
          msg: "请输入用户名或密码",
          result: "",
        },
        ctx
      );
      return;
    }
    try {
      const res = await createUser(user_name, password);
      console.log(res, "res");
      ctx.body = {
        code: 200,
        msg: "创建成功",
        result: {
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.error(error);
      if (error.parent.errno == 1062) {
        ctx.body = {
          code: 500,
          msg: "用户名已存在",
          result: "",
        };
      } else {
        ctx.body = {
          code: 500,
          msg: "服务器错误",
          result: "",
        };
      }
    }
  }
  // 用户登录
  async login(ctx, next) {
    const { user_name } = ctx.request
    ctx.body = {
      code:200,
      msg:"用户登录成功",
      result: user_name
    }
  }
}

module.exports = new UserController();
