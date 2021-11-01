const { createUser, getUserInfo } = require("../service/user.service");

class UserController {
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
  async login(ctx, next) {
    const { user_name, password } = ctx.request.query;
    try {
      const res = await getUserInfo({ user_name, password });
      if (res) {
        ctx.body = {
          code: 200,
          msg: "欢迎登录",
          result: {
            user_name: res.user_name,
          },
        };
        return;
      }
      ctx.app.emit(
        "error",
        {
          code: 400,
          msg: "用户登录失败,请检查用户名和密码",
          result: "",
        },
        ctx
      );
    } catch (error) {
      ctx.app.emit("error", {
        code: 500,
        msg: "登录异常",
        result: "",
      });
    }
  }
}

module.exports = new UserController();
