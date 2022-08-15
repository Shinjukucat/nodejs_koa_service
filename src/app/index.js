// 和业务相关的全都抽到这一块

const Koa = require('koa')

const koaBody = require('koa-body')

const userRouter = require('../router/user.route')

const errHandler = require('./errHandler')

const app = new Koa()

// 使用了koa-body后，请求体里面的内容就会添加到 ctx.request.body，因为koa自身并具备这个功能
app.use(koaBody())

// 添加路由的中间件
app.use(userRouter.routes())

// 统一错误处理
app.on('error', errHandler)

module.exports = app