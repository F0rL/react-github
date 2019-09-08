const oAuth_url = 'https://github.com/login/oauth/authorize'
const oAuth_scope = 'user'
const client_id = '05f5bd249a75e51efd9b'

module.exports ={
  github: {
    oAuth_url: 'https://github.com/login/oauth/authorize',
    oAuth_scope: 'user',
    request_token_url: 'https://github.com/login/oauth/access_token',
    get_user_url: 'https://api.github.com/user',
    client_id: client_id,
    client_secret: '5220d4339d20c21226c3115c2ad46a0958007eb9',
    OAUTH_URL: `${oAuth_url}?client_id=${client_id}&scope=${oAuth_scope}`
  }
}