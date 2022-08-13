const dotenv = require('dotenv')

// 下面这句配置就可以直接将.env里面的配置加载到环境变量里，很强大
dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env