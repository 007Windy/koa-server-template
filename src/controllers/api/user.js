const KoaRouter = require('@koa/router')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

// JWT 密钥
const secretKey = 'AbcX7Z@'

const router = new KoaRouter({
    prefix: '/user'
})

router.get('/info', async (ctx, next) => {
    const { token } = ctx.request.headers
    // console.log('global secretKey ==>', global.secretKey)
    
    const user = jwt.verify(token, global.secretKey)
    const userInfo = await User.findById(user._id).lean()
	ctx.body = {
        user: userInfo,
        token
    }
})


router.post('/login', async (ctx, next) => {
    // 获取用户登录账号和密码
    // 到数据库比对是否账户密码一致
    // 一致，签发token
    // 不一致，返回错误信息
    const { account, password } = ctx.request.body
    
    const user = await User.findOne({account,password}).lean()
    console.log('user =', user);
    if (user) {
        const token = jwt.sign({
            _id: user._id,
            expirt_at: Date.now() + 1000 * 60 *60 * 2
        }, secretKey)

        ctx.body = {
            'success': true,
            token
          }
    } else {
        ctx.body = {
            'success': false,
            user,
            'message': '账号或密码错误'
          }
    }
    
	
})

module.exports = router