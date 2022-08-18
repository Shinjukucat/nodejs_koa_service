const path = require('path')

const {fileUploadError, unSupportFileType, releaseGoodsError, invalidGoodsId} = require('../constant/err.type')

const {releaseGoods, editGoods, removeGoods, restoreGoods, findGoods} = require('../service/goods.service')

class GoodsController {
  // 图片上传功能
  async upload(ctx, next) {
    // console.log(ctx.request.files)
    const {file} = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(file) {
      // 下面这种处理不支持文件格式的方法并不好，这样文件还是会上传上来，正确的处理方法见 koa-body 的 ReadMe npm里面的包说明
      if(!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '图片上传成功',
        result: {
          // 拿到上传照片的的最终名字
          goods_img: path.basename(file.filepath)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  // 图片发布功能 最后一个中间件next可要可不要
  async release(ctx) {
    // 操作数据库
    try {
      // 把updatedAt, createdAt两个属性剔除掉   后面的 ctx.request.body 就是拿到前端传过来的数据参数
      const {updatedAt, createdAt, ...res} = await releaseGoods(ctx.request.body)
      ctx.response.body = {
        code: 0,
        message: '发布商品成功',
        result: res
      }
    } catch (error) {
      console.error(error)
      ctx.app.emit('error', releaseGoodsError, ctx)
      return
    }
  }

  // 修改商品信息功能
  async edit(ctx) {
    try {
      const res = await editGoods(ctx.params.id, ctx.request.body)
      if(res) {
        ctx.response.body = {
          code: 0,
          message: '修改商品成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsId, ctx)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 删除/下架商品的功能 硬删除
  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id)
      if(res) {
          ctx.response.body = {
          code: 0,
          message: '商品下架成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsId, ctx)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 上架商品的功能
  async restore(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id)
      if(res) {
          ctx.response.body = {
          code: 0,
          message: '商品上架成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsId, ctx)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 查询商品列表的功能
  async findAll(ctx) {
    // 1. 解析pageNum和pageSize
    const {pageNum = 1, pageSize = 10} = ctx.request.query
    // 2. 调用数据处理的相关方法
    try {
      const res = await findGoods(pageNum, pageSize)
      // 3. 返回结果
      ctx.response.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res
      }
    } catch (error) {
      console.error(error)
    }
  }
 }

module.exports = new GoodsController()