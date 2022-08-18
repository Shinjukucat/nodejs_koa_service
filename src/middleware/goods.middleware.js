const {goodsFormateError} = require('../constant/err.type')

// 进行上传图片的参数验证的中间件
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {type: 'string', required: true},
      goods_price: {type: 'number', required: true},
      goods_num: {type: 'number', required: true},
      goods_img: {type: 'string', required: true}
    })
  } catch (error) {
    console.error(error)
    goodsFormateError.result = error
    ctx.app.emit('error', goodsFormateError, ctx)
    return
  }

  await next()
}

module.exports = {
  validator
}