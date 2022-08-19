const address = require('../model/addr.model')

class AddrService {
  async createAddr(addr) {
    return await address.create(addr)
  }

  async getAddressList(id) {
    return await address.findAll({
      attributes: ['user_id', 'id', 'consignee', 'phone', 'address', 'is_default'],
      where: {user_id: id}
    })
  }

  async updataAddress(id, addr) {
    return await address.update(addr, {where: {id: id}})
  }

  async removeAddress(id) {
    return await address.destroy({where: {id: id}})
  }

  async setDefaultAddr(user_id, id) {
    await address.update(
      {is_default: false},
      {where: {user_id}}
    )
    
    return await address.update(
      {is_default: true},
      {where: {id}}
    )
  }
}

module.exports = new AddrService()