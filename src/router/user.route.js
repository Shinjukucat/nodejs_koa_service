const Router = require('koa-router')

const router = new Router({prefix: '/user'})

const {register, login, changePassword} = require('../controller/user.controller')

const {userValidator, vertifyUser, cryptPassword, vertifyLogin} = require('../middleware/user.middleware')

const {auth} = require('../middleware/auth.middleware')

// 在这里拆分出来了两条路，一条是注册登录的最后实现，另一条是注册登录前的验证等环节的中间件，最后的实现是最里面的那层中间件
// 用户注册接口  这里套了两层中间件，userValidator没有执行next的话，后面的中间件是不会执行的
router.post('/register', userValidator, vertifyUser, cryptPassword, register)

// 用户登录接口
router.post('/login', userValidator, vertifyLogin, login)

// 修改密码接口
router.patch('/', auth, cryptPassword, changePassword)

module.exports = router