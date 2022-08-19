const {addressFormateError} = require('../constant/err.type')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      await ctx.verifyParams(rules)
    } catch (error) {
      console.error(error)
      addressFormateError.result = error
      ctx.app.emit('error', addressFormateError, ctx)
      return
    }
    await next()
  }
}

module.exports = {
  validator
}