const Koa = require('koa')

const errorHandle = require('../config/error.config')

const KoaBody = require('koa-body')

const router = require('../router')

const app = new Koa()

// KoaBody的位置一定要在 router.routes()的前面
app.use(KoaBody({
    multipart:true
}))

app.use(router.routes())



app.on('error',errorHandle)

module.exports = app