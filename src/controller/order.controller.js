const {createOrder, getOrderList, updataOrder} = require('../service/order.service')

class orderController {
  // 创建订单的功能实现
  async create(ctx) {
    // 1. 准备数据
    const user_id = ctx.state.user.id
    const {address_id, goods_info, total} = ctx.request.body
    // 随机生成一个订单的唯一标识作为订单编号
    const order_number = 'XYZ' + Date.now()

    // 2. 操作数据库
    const res = await createOrder({user_id, address_id, goods_info, total, order_number})

    // 3. 返回数据
    ctx.response.body = {
      code: 0,
      message: '生成订单成功',
      result: res
    }
  }

  // 获取订单列表的功能实现
  async get(ctx) {
    const {pageNum = 1, pageSize = 10, status = 0} = ctx.request.query

    const res = await getOrderList(pageNum, pageSize, status)

    ctx.response.body = {
      code: 0,
      message: '获取订单列表成功',
      result: res
    }
  }

  // 更新订单状态的功能实现
  async updata(ctx) {
    const id = ctx.request.params.id
    const {status} = ctx.request.body

    const res = await updataOrder(id, status)

    ctx.response.body = {
      code: 0,
      message: '更新订单状态成功',
      updataNum: res
    }
  }
}

module.exports = new orderController()