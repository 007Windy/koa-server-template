const KoaRouter = require('@koa/router')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const router = new KoaRouter({
    prefix: '/api'
})

const userRouter = require('./api/user')


router.use(async (ctx, next) => {
    // console.log('api =>', ctx.request);
    const { token } = ctx.request.headers
    // 接口访问白名单
    const WHITE_LIST = ['/api/user/login']
    if (!WHITE_LIST.includes(ctx.request.url)) {
        if (!token) {
            ctx.body = {
                success: false,
                code: 405,
                msg: '用户未登录'
            }
            return
        }
        const user = jwt.verify(token, global.secretKey)
        if (!user || Date.now() > user?.expirt_at) {
            ctx.body = {
                success: false,
                code: 405,
                msg: '用户未登录或者登录已过期'
            }
            return
        }
    }

    await next()
    
})

router.use(userRouter.routes(), userRouter.allowedMethods())

module.exports = router
