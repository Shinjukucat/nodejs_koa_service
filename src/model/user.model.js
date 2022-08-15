const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> zd_users，将下面的模型创建到数据库中)
const User = seq.define('zd_user', {
  // id 会被sequelize自动创建，管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，0不是，1是,0是默认值'
  }
})

// 执行下面的方法可以自动地在数据库中根据上面的ORM属性创建一张数据表
// 强制同步数据库，就是在数据库中创建对应的数据表，在创建完毕后就可以注释掉了
// User.sync({force: true})

module.exports = User