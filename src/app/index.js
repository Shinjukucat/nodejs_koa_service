// 和业务相关的全都抽到这一块
// 以后按以下顺序放置三种包、模块
// node核心的模块
const path = require('path')

// 第三方的模块
const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')

// 自己写的模块
const router = require('../router')
const errHandler = require('./errHandler')

const app = new Koa()

// 使用了koa-body后，请求体里面的内容就会添加到 ctx.request.body，因为koa自身并具备这个功能
app.use(koaBody({
  // 打开文件上传功能
  multipart: true,
  formidable: {
    // 配置上传的文件放在哪个目录下
    uploadDir: path.join(__dirname, '../upload'),
    // 是否保存文件的扩展名
    keepExtensions: true,
  },
  parsedMethods: ['POST', 'GET', 'PATCH', 'DELETE']
}))
// koa-static插件的使用  将koaStatic里面配置的文件路径文件夹里面的资源设置为静态资源，使得前端可以访问查看到上传的图片
app.use(koaStatic(path.join(__dirname, '../upload')))
// 添加参数验证对象
app.use(parameter(app))
// 添加路由的中间件
app.use(router.routes())
// 下面这个方法可以检测定义的请求方式，不符合的请求方式会报501，提示请求方式不正确
app.use(router.allowedMethods())

// 统一错误处理
app.on('error', errHandler)

module.exports = app