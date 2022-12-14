const jwt = require('jsonwebtoken')

const {JWT_KEY} = require('../config/config_default')

const {tokenExpiredError, invalidToken, withoutAdminPermission} = require('../constant/err.type')

// 该中间件用来验证用户是否登录  token是否已过期
const auth = async (ctx, next) => {
  // 这个authorization必须要小写
  const {authorization = ''} = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // console.log(token)

  try {
    // 如果验证成功的话，user中就包含了这个token对应用户对应的payload里的信息(id, user_name, is_admin)
    // 对用户携带的token令牌进行解析
    const user = jwt.verify(token, JWT_KEY)
    // 将解析出来的payload保存起来，之后就可以直接使用了
    ctx.state.user = user
  } catch (error) {
    switch(error.name) {
      
      case 'TokenExpiredError' :
        console.error('token过期', error)
        ctx.app.emit('error', tokenExpiredError, ctx)
        return
      case 'JsonWebTokenError':
        console.error('无效的token', error)
        ctx.app.emit('error', invalidToken, ctx)
        return
    }
  }

  await next()
}

// 检测用户是否有管理员权限
const haveAdminPermission = async (ctx, next) => {
  const {is_admin} = ctx.state.user

  if(! is_admin) {
    console.error('该用户没有管理员权限', ctx.state.user)
    return ctx.app.emit('error', withoutAdminPermission, ctx)
  }

  await next()
}

module.exports = {
  auth,
  haveAdminPermission
}