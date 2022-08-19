const Router = require('koa-router')

// 控制器
const {add, getAll, updata, remove, selectAll, unSelectedAll} = require('../controller/cart.controller')
// 中间件
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middle')

const router = new Router({prefix: '/cart'})

// 添加到购物车的接口
router.post('/', auth, validator({goods_id: 'number'}), add)

// 获取购物车列表接口
router.get('/', auth, getAll)

// 更新购物车列表接口
router.patch('/:id', auth, validator({
  number: {type: 'number', required: false},
  selected: {type: 'bool', required: false}
}), updata)

// 删除/批量删除购物车中的数据接口
router.delete('/', auth, validator({ids: {type: 'array', required: true}}), remove)

// 购物车列表商品全选接口
router.post('/selectAll', auth, selectAll)

// 购物车列表商品全不选接口
router.post('/unSelectedAll', auth, unSelectedAll)

module.exports = router