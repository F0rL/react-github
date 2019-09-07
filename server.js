const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session")

const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')

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

  // server.use(async (ctx, next) => {
  //   if(ctx.cookies.get('gid')){
  //     ctx.session = {}
  //   }
  //   await next()
  // })
  // server.use(async (ctx, next) => {
  //   // console.log(ctx.cookies.get('id'))
  //   //获取用户数据
  //   if(ctx.session.user) {
  //     ctx.session.user = {
  //       name: 'kuma',
  //       age: 22
  //     }
  //   }else {
  //     console.log('session is',  ctx.session.user)
  //   }
  //   await next()
  // })
  // router.get("/a/:id", async (ctx) => {
  //   const id = ctx.params.id;
  //   await handle(ctx.req, ctx.res, {
  //     pathname: "/a",
  //     query: { id }
  //   });
  //   ctx.respond = false;
  // });

  router.get("/api/set/user", async (ctx) => {
    //触发set方法
    ctx.session.userInfo ={
      name: 'kuma',
      age: 22
    }
    ctx.body = 'set session success'
  });

  router.get("/api/user/info", async(ctx) => {
    const user = ctx.session.userInfo
    if(!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    }else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  router.get("/api/delete/user", async (ctx) => {
    //触发destroy方法
    ctx.session = null
    ctx.body = 'delete session success'
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userID:xxxxxxxxxxxxxx')
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res);
    //不在使用koa内置的对body处理
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("server is listening on 3000");
  });
});
