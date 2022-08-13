const {APP_PORT} = require('./config/config_default')

// Koa业务相关的被拆分到app/index.js，Koa里面的路由被拆分到router/下面，路由里面的实现模块又被拆分到controller/下面
const app = require('./app/index')

app.listen(APP_PORT, () => {
  console.log(`service is running in http://localhost:${APP_PORT}`)
})