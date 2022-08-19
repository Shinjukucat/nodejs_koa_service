// 1. 导入koa-router包
const Router = require('koa-router')

// 2. 实例化对象
const router = new Router({prefix: '/address'})

// 中间件
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/addr.route')
// 控制器
const {create, get, updata, remove, setDefault} = require('../controller/addr.controller')

// 3. 编写路由规则
// 添加地址接口
router.post('/', auth, validator({
  consignee: {type: 'string', required: true},
  phone: {type: 'string', format: /^1\d{10}$/},
  address: {type: 'string', required: true}
}), create)

// 获取地址列表的接口
router.get('/', auth, get)

// 更新地址接口
router.put('/:id', auth, validator({
  consignee: 'string',
  phone: {type: 'string', format: /^1\d{10}$/},
  address: 'string'
}), updata)

// 删除地址的接口
router.delete('/:id', auth, remove)

// 设置默认地址接口
router.patch('/:id', auth, setDefault)

// 4. 导出router对象
module.exports = router