const api = require('../lib/api')

const Index = () => {
  return <span>index</span>;
};

Index.getInitialProps = async ({ctx}) => {
  // const result = await axios
  //   .get("/github/search/repositories?q=react")
  //   .then(resp => console.log(resp));
  const result = await api.request({
    url: '/search/repositories?q=react'
  }, ctx.req, ctx.res)
  return {
    data: result.data
  };
};

export default Index;
