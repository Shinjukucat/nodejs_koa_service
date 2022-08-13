// 和业务相关的全都抽到这一块

const Koa = require('koa')

const koaBody = require('koa-body')

const userRouter = require('../router/user.route')

const app = new Koa()

// 使用了koa-body后，请求体里面的内容就会添加到 ctx.request.body，因为koa自身并具备这个功能
app.use(koaBody())
app.use(userRouter.routes())

module.exports = app