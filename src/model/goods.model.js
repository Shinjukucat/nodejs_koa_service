const {DataTypes} = require('sequelize')

// 导入数据库连接
const seq = require('../db/seq')

const Goods = seq.define('zd_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片的url'
  }
}, {
  paranoid: true
})

// 强制创建这张表，创建完成后就可以把这句注释掉
// Goods.sync({force: true})

module.exports = Goods