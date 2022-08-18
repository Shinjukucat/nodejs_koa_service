const Goods = require('../model/goods.model')

class GoodsService {
  async releaseGoods(goods) {
    console.log('发布成功')
    const res = await Goods.create(goods)
    return res.dataValues
  }

  async editGoods(id, goods) {
    const res = await Goods.update(goods, {where: {id}})
    return res[0] > 0 ? true : false
  }

  async removeGoods(id) {
    const res = await Goods.destroy({where: {id}})
    // console.log(res)
    return res > 0 ? true : false
  }

  async restoreGoods(id) {
    const res = await Goods.restore({where: {id}})
    return res > 0 ? true : false
  }

  async findGoods(pageNum, pageSize) {
    // 1. sequelize分开写
    // // 1. 获取商品总数  sequelize会自动检索deletedAt=null的数据，下架的商品不会被算在总数中
    // const count = await Goods.count()
    // // 2. 获取分页的具体数据
    // const offset = (pageNum - 1) * pageSize
    // const rows = await Goods.findAll({offset: offset, limit: pageSize * 1})

    // 2. sequelize提供的简写方法
    const offset = (pageNum - 1) * pageSize
    const {count, rows} = await Goods.findAndCountAll({offset: offset, limit: pageSize * 1})

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }
}

module.exports = new GoodsService()