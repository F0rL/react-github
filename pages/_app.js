/**
 * 自定义_app文件
 * 控制页面初始化；如：
 * 1.当页面变化时保持页面布局
 * 2.当路由变化时保持页面状态
 * 3.使用componentDidCatch自定义处理错误
 * 4.注入额外数据到页面里 (如 GraphQL 查询)
 */
import App from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
//重要 同步服务端客户端
import WithRedux from "../lib/with-redux";
import "antd/dist/antd.css";
import PageLoading from "../components/PageLoading.jsx";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";

class MyApp extends App {
  state = {
    context: "value",
    loading: false
  };
  startLoading = () => {
    this.setState({
      loading: true
    });
  };
  stopLoading = () => {
    this.setState({
      loading: false
    });
  };
  componentDidMount() {
    Router.events.on("routeChangeStart", this.startLoading);
    Router.events.on("routeChangeComplete", this.stopLoading);
    Router.events.on("routeChangeError", this.stopLoading);
    // axios
    //   .get("/github/search/repositories?q=react")
    //   .then(resp => console.log(resp));
  }
  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.startLoading);
    Router.events.off("routeChangeComplete", this.stopLoading);
    Router.events.off("routeChangeError", this.stopLoading);
  }
  //每次页面切换都执行此方法
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        {this.state.loading ? <PageLoading /> : null}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}
export default WithRedux(MyApp);
