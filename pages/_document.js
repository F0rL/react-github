import Document, { Html, Head, Main, NextScript } from "next/document";
import {ServerStyleSheet} from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          //返回HOC
          enhanceApp: App => (props) =>
            sheet.collectStyles(<App {...props} />)
        });
      const props = await Document.getInitialProps(ctx);
      return {
        ...props,
        styles: <>{props.styles}{sheet.getStyleElement()}</>
      };
    } finally {
      sheet.seal();
    }
  }
  //如果覆盖，基础部分必须写Html，Head，Main，NextScript
  render() {
    return (
      <Html>
        <Head></Head>
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
