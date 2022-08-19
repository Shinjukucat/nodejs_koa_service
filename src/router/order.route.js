// 导入路由对象
const Router = require('koa-router')
// 实例化对象
const router = new Router({prefix: '/order'})

// 中间件
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/order.middleware')

// 控制器
const {create, get, updata} = require('../controller/order.controller')

// 编写路由规则
// 生成订单的接口
router.post('/', auth, validator({
  address_id: 'int',
  goods_info: 'string',
  total: 'string'
}), create)

// 获取订单列表信息的接口
router.get('/', auth, get)

// 更新订单状态的接口 修改支付状态
router.patch('/:id', auth, validator({
  status: 'number'
}), updata)

// 导出router对象
module.exports = router

