const Router = require('koa-router')
const router = new Router({prefix: '/goods'})

const {upload, release, edit, remove, restore, findAll} = require('../controller/goods.controller')
const {auth, haveAdminPermission} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/goods.middleware')

// 上传商品图片接口
// 只要使用了auth这个中间件，ctx.state.user里面就会有当前用户的全部数据，具体见auth中间件
router.post('/upload', auth, haveAdminPermission, upload)

// 发布商品的接口
router.post('/', auth, haveAdminPermission, validator, release)

// 修改商品的接口
router.put('/:id', auth, haveAdminPermission, validator, edit)

// 删除商品的接口 硬删除
// router.delete('/:id', auth, haveAdminPermission, remove)

// 删除/下架商品的接口 软删除  相当于下架  这里删除和下架商品可以共用一个接口
router.post('/:id/off', auth, haveAdminPermission, remove)

// 上架商品的接口
router.post('/:id/on', auth, haveAdminPermission, restore)

// 查询商品列表的接口
router.get('/', findAll)

module.exports = router