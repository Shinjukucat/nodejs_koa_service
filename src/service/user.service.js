const User = require('../model/user.model')

class UserService {
  // 注册 创建新用户 写入数据库是异步操作，所以用async
  async createUser(user_name, password) {
    // 插入数据
    const res = await User.create({
      // 表中的字段 : 插入的数据
      user_name,
      password
    })
    console.log(res)
    return res.dataValues
  }

  // 查询用户
  async getUserInfo({id, user_name, password, is_admin}) {
    const whereOpt = {}

    id && Object.assign(whereOpt, {id})
    user_name && Object.assign(whereOpt, {user_name})
    password && Object.assign(whereOpt, {password})
    is_admin && Object.assign(whereOpt, {is_admin})

    try {
      const res = await User.findOne({
        attributes: ['id', 'user_name', 'password', 'is_admin'],
        where: whereOpt
      })
      return res.dataValues
    } catch (error) {
      return null
    }
  }

  // 修改密码  
  async updataPasswordById({id, user_name, password, is_admin}) {
    const whereOpt = {id}
    const newUser = {}

    // 这里对象里都是简写形式，传入的是 user_name: user_name， password: password
    user_name && Object.assign(newUser, {user_name})
    password && Object.assign(newUser, {password})
    is_admin && Object.assign(newUser, {is_admin})

    try {
      const res = await User.update(newUser, {where: whereOpt})
      // console.log(res)
      return res > 0 ? true : false
    } catch (error) {
      return null
    }
  }
}

// 虽然是类，但是以对象形式导出
module.exports = new UserService()