const Router = require('koa-router')

const { register, login, changePwd, deleteUser } = require('../controller/user.controller')

const { bcryptPassword, vertifyPassword, jwtTokenCheck } = require('../middleware/pwd.middleware')

const router = new Router({ prefix: '/users' })

router.post('/register', bcryptPassword, register)
router.get('/login', vertifyPassword, login)
router.put('/changepwd', jwtTokenCheck, bcryptPassword, changePwd)
router.delete('/userdelete',jwtTokenCheck, deleteUser)
module.exports = router