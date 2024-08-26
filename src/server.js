const Koa = require('koa')
const KoaBodyParser = require('koa-bodyparser')
const app = new Koa()

// JWT密钥 全局配置化
global.secretKey = 'AbcX7Z@'

app.use(KoaBodyParser({
    enableTypes: ['json', 'form', 'text']
}))

const router = require('./controllers/api')
app.use(router.routes(), router.allowedMethods())


app.listen('8000')