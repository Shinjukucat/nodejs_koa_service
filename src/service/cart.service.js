const Cart = require('../model/cart.model')
const {Op} = require('sequelize')
const Goods = require('../model/goods.model')

class CartService {
  // 添加商品到购物车的数据库操作
  async createOrUpdata(user_id, goods_id) {
    // 1. 根据user_id和goods_id查找数据表中是否有数据
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id
        }
      }
    })
    if(res) {
      // 该用户的购物车表里面已经存在该商品的情况 
      // 如果已经有的话数量+1，下面是sequelize的一个简写方法  将更新后的结果返回
      return await res.increment('number')
      // return await res.reload()
    } else {
      // 该用户的购物车中没有该商品的情况
      // 创建一条数据，并将其返回
      return await Cart.create({
        user_id,
        goods_id
      })
    }
  }

  // 获得购物车列表的数据库操作
  // 想要在购物车列表里展示商品的信息话，需要将两个表相关联，连表查询，在商品数据表查到数据展示出来
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const {count, rows} = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],  //指定显示这三个数据
      offset: offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
      }
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  // 更新购物车的数据库操作
  async updataCart(params) {
    const {id, number, selected} = params
    try {
      const res = await Cart.findByPk(id)
      // if(!res) return ''
  
      number !== undefined ? res.number = number : ''
      selected !== undefined ? res.selected = selected : ''
  
      return await res.save()
    } catch (error) {
      return ''
    }
  }

  // 删除购物车中商品的数据库操作
  async removeCartgoods(ids) {
    // 下面这几行语句就可以实现删除数据库中的数据
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }

  // 购物车列表商品全选的数据库操作
  async selectAllGoods(id) {
    // 这样返回的是受影响的行数，有几条数据被更改了
    return await Cart.update(
      // 数据库操作
      {selected: true},
      {
        // 条件
        where: {
          user_id: id
        }
      }
    )
  }

  // 购物车列表商品全不选的数据库操作
  async unSelectedAllGoods(id) {
    return await Cart.update(
      {selected: false},
      {
        where: {
          user_id: id
        }
      }
    )
  }
}

module.exports = new CartService()