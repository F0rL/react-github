const webpack  = require("webpack")
const withCss = require("@zeit/next-css");
const withBundleAnalyzer =require('@zeit/next-bundle-analyzer')
const config = require('./config')

const configs = {
  // 编译文件的输出目录
  distDir: "dest",
  // 是否给每个路由生成Etag
  // 一般用nginx配置
  generateEtags: true,
  // 页面内容缓存配置
  onDemandEntries: {
    // 内容在内存中缓存的时长（ms）
    maxInactiveAge: 25 * 1000,
    // 同时缓存多少个页面
    pagesBufferLength: 2
  },
  // 在pages目录下那种后缀的文件会被认为是页面
  pageExtensions: ["jsx", "js"],
  // 配置buildId，同一个项目部署多个节点才使用
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }

    // 返回null使用默认的unique id
    return null;
  },
  // 手动修改webpack config
  webpack(config, options) {
    return config;
  },
  // 修改webpackDevMiddleware配置
  webpackDevMiddleware: config => {
    return config;
  },
  // 可以在页面上通过 procsess.env.customKey 获取 value
  env: {
    customKey: "value"
  },
  // 下面两个要通过 'next/config' 来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET
  },
  // 在服务端渲染和客户端渲染都可获取的配置
  publicRuntimeConfig: {
    staticFolder: "/static"
  }
};

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}
//如果引用多个包，这里可以连环调用eg：withLess（withCss({})）

const {OAUTH_URL} = config.github

module.exports = withBundleAnalyzer(withCss({
  webpack(config){
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    return config
  },
  env: {
    customKey: "value"
  },
  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET
  },
  // 在服务端渲染和客户端渲染都可获取的配置
  publicRuntimeConfig: {
    staticFolder: "/static",
    OAUTH_URL
  }, // 这里配置了之后才会生效
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundle/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundle/client.html'
    }
  }
}));
