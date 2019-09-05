import { withRouter } from "next/router";
import Link from "next/link";

//组件被渲染后，样式（包括global样式）才会显示

const color = 'pink'
const A = ({ router, name }) => {
  return (
    <>
      <Link>
        <a>
          <p>
            a page id : {router.query.id}; name: {name}
          </p>
        </a>
      </Link>
      <style jsx>
        {`
          a {
            color: blue;
          }
          a {
            color: ${color};
          }
        `}
      </style>
      <style jsx global>
        {`
          a {
            color: yellow;
          }
        `}
      </style>
    </>
  );
};

A.getInitialProps = async ctx => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "kuma"
      });
    }, 1000);
  });
  return await promise;
};
export default withRouter(A);
