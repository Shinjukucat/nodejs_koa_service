const Router = require('koa-router')

const router = new Router({prefix: '/user'})

const {register, login} = require('../controller/user.controller')

// 用户注册接口
router.post('/register', register)

// 用户登录接口
router.post('/login', login)

module.exports = router