class UserService {
  // 注册 创建新用户 写入数据库是异步操作，所以用async
  async createUser(user_name, password) {
    // todo: 写入数据库的操作
    return '写入数据库成功'
  }
}

// 虽然是类，但是以对象形式导出
module.exports = new UserService()