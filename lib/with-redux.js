import createStore from "../store";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    render() {
      const { Component, pageProps, ...rest } = this.props;
      if (pageProps) {
        pageProps.test = "test123";
      }
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  //初始化store，服务端执行一次，客户端跳转会执行
  //登录后，将获取的用户信息直接初始化放入redux
  WithReduxApp.getInitialProps = async ctx => {
    let reduxStore
    if(isServer) {
      // console.log(ctx)
      const {req} = ctx.ctx
      const session = req.session
      if(session && session.userInfo) {
        reduxStore = getOrCreateStore({
          USER: session.userInfo
        })
      }else {
        reduxStore = getOrCreateStore();
      }
    }else {
      reduxStore = getOrCreateStore();
    }

    ctx.reduxStore = reduxStore;
    
    let appProps = {};
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }
    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    };
  };
  return WithReduxApp;
};
