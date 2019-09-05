import { withRouter } from "next/router";

const A = ({ router, name}) => {
  console.log(router)
  return (
    <p>a page id : {router.query.id}; name: {name}</p>
  )
};

A.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'kuma'
      })
    }, 1000)
  })
  return await promise
}
export default withRouter(A);
