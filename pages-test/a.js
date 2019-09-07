import { withRouter } from "next/router";
import Link from "next/link";

import getConfig from 'next/config'

//组件被渲染后，样式（包括global样式）才会显示

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

const color = "pink";
const A = ({ router, name, time }) => {
  console.log(serverRuntimeConfig, publicRuntimeConfig)
  return (
    <>
      <Link href="/">
        <div>
          <p>
            a page id : {router.query.id}; name: {name}
          </p>
          <p>customKey: {process.env.customKey}</p>
          <p>time: {time}</p>
        </div>
      </Link>
      <style jsx>
        {`
          p {
            color: blue;
          }
          p {
            color: ${color};
          }
        `}
      </style>
      <style jsx global>
        {`
          p {
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
};

A.getInitialProps = async ctx => {
  const moment = await import("moment");
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "kuma",
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      });
    }, 1000);
  });
  return await promise;
};
export default withRouter(A);
