// 控制器  将路由里面不同路径url对应的方法函数抽离出来，交给控制器处理
const {createUser} =  require('../service/user.service')
class UserController {
  // 注册
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const {user_name, password} = ctx.request.body

    // 2. 操作数据库
    const res = await createUser(user_name, password)
    console.log(res)
    
    // 3. 返回结果
    ctx.response.body = ctx.request.body
    // ctx.response.body = '注册成功'
  }

  // 登录
  async login(ctx, next) {
    ctx.response.body = '登录成功'
  }
}

module.exports = new UserController()