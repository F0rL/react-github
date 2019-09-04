import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";

export default () => {
  function gotoPageB() {
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    });
  }
  return (
    <div>
      <Link href="/a?id=1" title="AAA">
        <Button>to a</Button>
      </Link>
      <Button onClick={gotoPageB}>to b</Button>
    </div>
  );
};
