const fs = require('fs')

const Router = require('koa-router')

const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
  // console.log(file)  //这里会打印出当前目录下所有的文件包括index.js
  if(file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

module.exports = router