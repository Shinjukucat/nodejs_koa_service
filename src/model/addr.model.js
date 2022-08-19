// 1. 导入req连接
const seq = require('../db/seq')
const {DataTypes} = require('sequelize')

// 2. 定义字段/模型
const address = seq.define('zd_address', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人姓名'
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '收货人手机号码'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人地址'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为默认地址，0：不是默认，1：是默认'
  }
})

// 3. 同步 sync  创建表
// address.sync({force: true})

// 4. 导出模型对象
module.exports = address
