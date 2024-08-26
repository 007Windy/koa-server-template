### koa backend sever project
这是 koa + mongoDB 后端服务项目模板
本项目使用 mongoose 链接 mongoDB 数据库

process.json 是 使用 PM2 做集群管理的配置参考

### 目前实现的基本功能：
1. mongodb数据库链接
2. api路由处理和拦截，开放了可配置白名单
3. JWT用户登录签发token

### 项目运行

安装项目依赖：yarn install

一、单独运行
- yarn run dev

二、PM2集群式运行
- yarn run pm2