const {orderFormateError} = require('../constant/err.type')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.error(error)
      orderFormateError.result = error
      ctx.app.emit('error', orderFormateError, ctx)
      return
    }

    await next()
  }
}

module.exports = {
  validator
}