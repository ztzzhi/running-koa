const Koa = require('koa')

const errorHandle = require('../config/error.config')
const KoaBody = require('koa-body')

const userRouter = require('./user.router')

const app = new Koa()

app.use(KoaBody({
    multipart:true
}))

app.use(userRouter.routes())

app.on('error',errorHandle)

module.exports = app