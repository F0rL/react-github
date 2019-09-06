const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session")

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['kuma develop github']
  const SESSION_CONFIG = {
    key: 'gid'
  }
  server.use(session(SESSION_CONFIG,server))

  server.use(async (ctx, next) => {
    if(ctx.cookies.get('gid')){
      ctx.session = {}
    }
    await next()
  })
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
  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id }
    });
    ctx.respond = false;
  });

  router.get("/set/user", async (ctx) => {
    ctx.session.user ={
      name: 'kuma',
      age: 22
    }
    ctx.body = 'set session success'
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.cookies.set('id', 'userID:xxxxxxxxxxxxxx')
    await handle(ctx.req, ctx.res);

    //不在使用koa内置的对body处理
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("server is listening on 3000");
  });
});
