const {cartFormatError} = require('../constant/err.type')

// 形成一个闭包 这里提高了函数的复用性，可以校验各种规则
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.error(error)
      cartFormatError.result = error
      ctx.app.emit('error', cartFormatError, ctx)
      return
    }
    await next()
  }
}

module.exports = {
  validator
}