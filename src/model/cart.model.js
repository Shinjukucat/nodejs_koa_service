const {DataTypes} = require('sequelize')
const Goods = require('./goods.model')

// 导入数据库连接
const seq = require('../db/seq')

// 定义cart模型/cart的数据表
const Cart = seq.define('zd_cart', {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品的id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户的id'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:1,
    comment: '商品的数量'
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否勾选'
  }
})

// 3. 创建数据表
// Cart.sync({force: true})

// 与商品表关联
Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info'
})

// 4. 导出数据表/模型
module.exports = Cart