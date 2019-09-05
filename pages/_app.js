import App, { Container } from "next/app";

import "antd/dist/antd.css";

class MyApp extends App {
  static async getInitialProps({Component}) {
    console.log('app init')
    let pageProps 
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps()
    }
    return {
      pageProps
    }
  }
  render() {
    const { Component, pageProps} = this.props
    console.log(Component)
    return (
      <Component {...pageProps}/>
    )
  }
}

export default MyApp;
