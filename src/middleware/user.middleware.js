// 引入bcriptjs包
const bcrypt = require('bcryptjs')

const {getUserInfo} = require('../service/user.service')
const {userFormateError, 
       userAlreadyExited, 
       userRegisterError, 
       userDoesNotExited, 
       userLoginError, 
       invalidPassword} = require('../constant/err.type')

// 检查是否输入账号 || 密码的中间件
const userValidator = async(ctx, next) => {
  const {user_name, password} = ctx.request.body
  // 判断用户输入的 合法性(没有输入用户名或密码)
  if(!user_name || !password) {
    console.error('用户未填写账号|密码')
    ctx.app.emit('error', userFormateError, ctx)
    // 这里一定要记得return，不然下面的代码继续执行还会添加数据库
    return
  }
  await next()
}

// 检查是否已存在用户名的中间件
const vertifyUser = async(ctx, next) => {
  const {user_name} = ctx.request.body
  // 合理性(用户名已存在)
  // if(await getUserInfo({user_name})) {
  //   // ctx.response.status = 409
  //   // ctx.response.body = {
  //   //   code: '10002',
  //   //   message: '用户名已存在',
  //   //   result: ''
  //   // }
  //   ctx.app.emit('error', userAlreadyExited, ctx)
  //   return
  // }
  try {
    const res = await getUserInfo({user_name})
    if(res) {
      // 用户名已经存在所以报错
      console.error('用户名已存在')
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (error) {
    // getUserInfo请求失败所以报错
    console.error('注册请求发送失败')
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

// 明文加密的中间件
const cryptPassword = async (ctx, next) => {
  const {password} = ctx.request.body
  // 加10次盐
  const salt = bcrypt.genSaltSync(10)
  // hash保存加盐后的密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

// 用户登录验证，账号密码是否匹配存在
const vertifyLogin = async (ctx, next) => {
  const {user_name, password} = ctx.request.body
  // 1. 判断用户是否存在
  try {
    const res = await getUserInfo({user_name})
    if(!res) {
      // 打印错误日志
      console.error('用户名不存在', {user_name})
      // 做出响应
      ctx.app.emit('error', userDoesNotExited, ctx)
      return
    }

    // 2. 判断用户名与密码是否匹配
    if(!bcrypt.compareSync(password, res.password)) {
      console.error('用户密码输入错误')
      ctx.app.emit('error', invalidPassword, ctx)
      return
  }

  } catch (error) {
    console.error('登录请求发送失败')
    ctx.app.emit('error', userLoginError, ctx)
    return
  }



  // 一切都正常
  await next()
}

module.exports = {
  userValidator,
  vertifyUser,
  cryptPassword,
  vertifyLogin,
}