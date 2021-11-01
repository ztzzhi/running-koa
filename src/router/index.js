const Koa = require('koa')

const KoaBody = require('koa-body')

const userRouter = require('./user.router')

const app = new Koa()

app.use(KoaBody({
    multipart:true
}))

app.use(userRouter.routes())

module.exports = app