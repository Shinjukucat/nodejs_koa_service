const {createAddr, getAddressList, updataAddress, removeAddress, setDefaultAddr} = require('../service/addr.route')

class addrController {
  async create(ctx) {
    // 1. 解析请求参数
    const user_id = ctx.state.user.id
    const {consignee, phone, address} = ctx.request.body
    // 2. 操作数据库
    const res = await createAddr({user_id, consignee, phone, address})
    // 3. 返回数据
    ctx.response.body = {
      code: 0,
      message: '添加地址成功',
      result: res
    }
  }

  async get(ctx) {
    const user_id = ctx.state.user.id

    const res = await getAddressList(user_id)

    ctx.response.body = {
      code: 0,
      message: '获取地址列表信息成功',
      result: res
    }
  }

  async updata(ctx) {
    const id = ctx.request.params.id  //这是修改的购物车里的商品的id
    // const {consignee, phone, address} = ctx.request.body

    const res = await updataAddress(id, ctx.request.body)

    ctx.response.body = {
      code: 0,
      message: '更新地址成功',
      result: res
    }
  }

  async remove(ctx) {
    const id = ctx.request.params.id

    const res = await removeAddress(id)

    ctx.response.body = {
      code: 0,
      message: '删除地址成功',
      result: res
    }
  }

  async setDefault(ctx) {
    const user_id = ctx.state.user.id
    const id = ctx.request.params.id

    const res = await setDefaultAddr(user_id, id)

    ctx.response.body = {
      code: 0,
      message: '设置默认地址成功',
      result: res
    }
  }
}

module.exports = new addrController()