export default (Comp) => {
  function TestHoc({Component, pageProps, ...rest}) {
    console.log(Component, pageProps)
    pageProps && (pageProps.test = 'test123')
    return  <Comp Component={Component} pageProps={pageProps} {...rest}/>
  }
  TestHoc.getInitialProps = Comp.getInitialProps
  return TestHoc
}