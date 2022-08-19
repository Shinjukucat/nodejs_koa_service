const {createOrUpdata, findCarts, updataCart, removeCartgoods, selectAllGoods, unSelectedAllGoods} = require('../service/cart.service')
const {addCartError, getCartError, updataParamsError, updataCartError} = require('../constant/err.type')

class CartController {
  // 添加到购物车功能
  async add(ctx) {
    // 1. 解析 user_id 和 goods_id
    const user_id = ctx.state.user.id
    const goods_id = ctx.request.body.goods_id
    // console.log(user_id, goods_id)
    try {
      // 2. 操作数据库
      const res = await createOrUpdata(user_id, goods_id)
      // 3. 返回结果
      ctx.response.body = {
        code: 0,
        message: '添加到购物车成功',
        result: res
      }
    } catch (error) {
      addCartError.result = error
      ctx.app.emit('error', addCartError, ctx)
      return
    }
  }

  // 获得购物车列表功能
  async getAll(ctx) {
    // 1. 解析请求参数
    const {pageNum = 1, pageSize = 10} = ctx.request.query
    try {
      // 2. 操作数据库
      const res = await findCarts(pageNum, pageSize)
      // 3. 返回结果
      ctx.response.body = {
        code: 0,
        message: '获取购物车列表成功',
        result: res
      }
    } catch (error) {
      console.error(error)
      getCartError.result = error
      ctx.app.emit('error', getCartError, ctx)
      return
    }
  }

  // 更新购物车列表功能
  async updata(ctx) {
    // 1. 解析请求参数
    const {id} = ctx.request.params
    const {number, selected} = ctx.request.body
    if(number === undefined && selected === undefined) {
      return ctx.app.emit('error', updataParamsError, ctx)
    }
    try {
      // 2. 操作数据库
      const res = await updataCart({id, number, selected})
      // 3. 返回数据
      ctx.response.body = {
        code: 0,
        message: '更新购物车列表成功',
        result: res
      }
    } catch (error) {
      console.error(error)
      updataCartError.result = error
      return ctx.app.emit('error', updataCartError, ctx)
    }
  }

  // 根据id删除购物车中的商品功能
  async remove(ctx) {
    // 1. 解析请求参数
    const {ids} = ctx.request.body
    // 2. 操作数据库
    const res = await removeCartgoods(ids)
    // 3. 返回数据
    ctx.response.body = {
      code: 0,
      message: '删除购物车商品成功',
      removeNum: res
    }
  }

  // 购物车列表商品全选功能
  async selectAll(ctx) {
    // 1. 解析请求参数
    const user_id = ctx.state.user.id
    // 2. 操作数据库
    const res = await selectAllGoods(user_id)
    // 3. 返回结数据
    ctx.response.body = {
      code: 0,
      message: '商品全选成功',
      selectedNum: res
    }
  }

  // 购物车列表商品全不选
  async unSelectedAll(ctx) {
    // 1. 解析请求参数
    const user_id = ctx.state.user.id
    // 2. 操作数据库
    const res = await unSelectedAllGoods(user_id)
    // 3. 返回数据
    ctx.response.body = {
      code: 0,
      message: '购物车商品全不选成功',
      unSelectedNum: res
    }
  }
}

module.exports = new CartController()