const Koa = require('koa')

const app = new Koa()

app.use((ctx)=>{
    ctx.body = {
        code:20011
    }
})

app.listen(3001,()=>{
    console.log('service is running at http://localhost:3001')
})