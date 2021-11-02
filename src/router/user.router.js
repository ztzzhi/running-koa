const Router = require('koa-router')

const {register,login} = require('../controller/user.controller')

const {bcryptPassword ,vertifyPassword} = require('../middleware/pwd.middleware')

const router = new Router({prefix:'/users'})

router.post('/register',bcryptPassword, register)
router.get('/login',vertifyPassword,login)

module.exports = router