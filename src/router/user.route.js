const Router = require('koa-router')

const router = new Router({prefix: '/user'})

const {register, login} = require('../controller/user.controller')

const {userValidator, vertifyUser, cryptPassword, vertifyLogin} = require('../middleware/user.middleware')

// 用户注册接口  这里套了两层中间件，userValidator没有执行next的话，后面的中间件是不会执行的
router.post('/register', userValidator, vertifyUser, cryptPassword, register)

// 用户登录接口
router.post('/login', userValidator, vertifyLogin, login)

module.exports = router