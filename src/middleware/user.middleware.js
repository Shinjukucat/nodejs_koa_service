const {getUserInfo} = require('../service/user.service')
const {userFormateError, userAlreadyExited, userRegisterError} = require('../constant/err.type')

const userValidator = async(ctx, next) => {
  const {user_name, password} = ctx.request.body
  // 判断用户输入的 合法性(没有输入用户名或密码)
  if(!user_name || !password) {

    ctx.app.emit('error', userFormateError, ctx)
    // 这里一定要记得return，不然下面的代码继续执行还会添加数据库
    return
  }
  await next()
}

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
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (error) {
    ctx.app.emit('error', userRegisterError, ctx)
  }
  await next()
}

module.exports = {
  userValidator,
  vertifyUser
}