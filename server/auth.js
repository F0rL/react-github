const axios = require("axios");
const config = require("../config");
const { client_id, client_secret, request_token_url, get_user_url } = config.github;

// ctx.session.githubAuth 保存token
// ctx.session.userInfo 保存用户信息
module.exports = server => {
  server.use(async (ctx, next) => {
    if (ctx.path === "/api/oauth") {
      const code = ctx.query.code
      if (!code) {
        ctx.body = "code not exit";
        return;
      }
      const result = await axios({
        method: "POST",
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: "application/json"
        }
      });
      // 返回result的格式
      // result.data = {
      //   access_token: "9db2adaed452c70da72b6ca298c4dbaa00be6313",
      //   token_type: "bearer",
      //   scope: "user"
      // };

      //第二次用code请求token仍然会返回200，但返回内容为error，需排除
      if (result.status === 200 && !result.data.error) {
        //存放返回的token、type、scope信息
        ctx.session.githubAuth = result.data
        const {access_token, token_type} = result.data
        const userInfoResp = await axios({
          method: 'GET',
          url: get_user_url,
          headers: {
            'Authorization': `${token_type} ${access_token}`
          }
        })
        // console.log('userInfoResp: ', userInfoResp.data)
        ctx.session.userInfo = userInfoResp.data
        ctx.redirect('/')
      }else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    }else {
      await next()
    }
  });
  server.use( async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if(path === '/logout' && method === 'POST') {
      ctx.session = null
      ctx.body = 'logout success'
    }else {
      await next()
    }
  })
};
