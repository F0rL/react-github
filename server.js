const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session")

const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')

const auth = require('./server/auth')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//创建redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['kuma develop github']
  const SESSION_CONFIG = {
    key: 'gid',
    //maxAge: 10 * 1000,
    store: new RedisSessionStore(redis)
  }
  server.use(session(SESSION_CONFIG,server))

  //配置github登录
  auth(server)

  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id }
    });
    ctx.respond = false;
  });

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

  router.get("/set/user", async (ctx) => {
    //触发set方法
    ctx.session.user ={
      name: 'kuma',
      age: 22
    }
    ctx.body = 'set session success'
  });
  router.get("/delete/user", async (ctx) => {
    //触发destroy方法
    ctx.session = null
    ctx.body = 'delete session success'
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userID:xxxxxxxxxxxxxx')
    await handle(ctx.req, ctx.res);

    //不在使用koa内置的对body处理
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("server is listening on 3000");
  });
});
