async function test() {
  const Redis = require("ioredis");
  const redis = new Redis({
    //配置
    port: 6379, // Redis port
    password: 123456
  });
  await redis.set('c', 123)
  const keys = await redis.keys('*')
  console.log(keys)
}
