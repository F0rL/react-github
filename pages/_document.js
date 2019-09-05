import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  //如果覆盖必须至少执行以下代码
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx)
    return {
      ...props
    }
  }
  //如果覆盖，基础部分必须写Html，Head，Main，NextScript
  render() {
    return (
      <Html>
        <Head>
          <style>{`.test { color: red ;}`}</style>
        </Head>
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
