// import { useEffect } from "react";
// import axios from "axios";

const Index = () => {
  // useEffect(() => {
  //   return () => {
  //     axios.post("/github/test", { test: "123" });
  //   };
  // }, []);
  return <span>index</span>;
};

// Index.getInitialProps = async ({ctx}) => {
//   const result = await axios
//     .get("/github/search/repositories?q=react")
//     .then(resp => console.log(resp));
//   const result = await api.request({
//     url: '/search/repositories?q=react'
//   }, ctx.req, ctx.res)
//   return {
//     data: result.data
//   };
// };

export default Index;
