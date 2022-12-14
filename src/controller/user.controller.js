// 控制器  将路由里面不同路径url对应的方法函数抽离出来，交给控制器处理

// 导入jsonwebtoken的包
const jwt = require('jsonwebtoken')

const {JWT_KEY} = require('../config/config_default')

const {createUser, getUserInfo, updataPasswordById} =  require('../service/user.service')
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
    const {user_name} = ctx.request.body

    // 1. 获取用户信息(在token的payload中，记录id，user_name， is_admin)
    try {
      // 从返回结果中将password剔除掉，将剩下的形成一个新对象/数组
      const {password, ...res} = await getUserInfo({user_name})
      ctx.response.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          // token里的三个参数 用户信息，私钥，期限 这里是1d一天
          token: jwt.sign(res, JWT_KEY, {expiresIn: '1d'})
        }
      }
    } catch (error) {
      console.error('获取用户信息失败导致登录失败')
    }
    // ctx.response.body = `欢饮回来 ${user_name}`
  }

  // 用户修改密码的接口
  async changePassword(ctx, next) {
  // 1. 获取用户数据
  const id = ctx.state.user.id
  const password = ctx.request.body.password

  // 2. 操作数据库
  try {
    // 这里传入的id用来作为搜索条件，password就是用户输入的新密码
    const res = await updataPasswordById({id, password})
    // console.log(id, password)
    if(res) {
      ctx.response.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    } else {
      ctx.response.body = {
        code: '10007',
        message: '修改密码失败',
        result: ''
      }
    }
  } catch (error) {
    ctx.response.body = {
      message: '修改密码请求发送失败'
    }
  }

  // 3. 返回结果
}
}

module.exports = new UserController()