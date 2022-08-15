// 控制器  将路由里面不同路径url对应的方法函数抽离出来，交给控制器处理
const {createUser} =  require('../service/user.service')
const {userRegisterError} = require('../constant/err.type')
class UserController {
  // 注册
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const {user_name, password} = ctx.request.body

    try {
      // 2. 操作数据库
      const res = await createUser(user_name, password)
      
      // 3. 返回结果
      ctx.response.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', userRegisterError, ctx)
    }

    // ctx.response.body = '注册成功'
  }

  // 登录
  async login(ctx, next) {
    ctx.response.body = '登录成功'
  }
}

module.exports = new UserController()