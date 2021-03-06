const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session")
const koaBody = require('koa-body')

const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')
const auth = require('./server/auth')
const api = require('./server/api')
const atob = require('atob')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//创建redis client
const redis = new Redis()

//设置node.js全局增加一个atob方法
global.atob = atob

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['kuma develop github']
  server.use(koaBody())

  const SESSION_CONFIG = {
    key: 'gid',
    //maxAge: 10 * 1000,
    store: new RedisSessionStore(redis)
  }
  server.use(session(SESSION_CONFIG,server))

  //配置github登录
  auth(server)
  //配置代理github请求
  api(server)

  router.get("/api/user/info", async (ctx) => {
    const user = ctx.session.userInfo
    // console.log('user: ', user)
    if(!user) {
      ctx.status = 401
      ctx.body = 'need login'
    }else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  });
  
  server.use(router.routes());

  server.use(async (ctx, next) => {
    //
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res);
    //不在使用koa内置的对body处理
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("server is listening on 3000");
  });
});
