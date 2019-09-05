import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete',
]
function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}
events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

export default () => {
  function gotoPageB() {
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    }, '/b/2');
  }
  return (
    <div>
      <Link href="/a?id=1" as="/a/1">
        <Button>to a</Button>
      </Link>
      <Button onClick={gotoPageB}>to b</Button>
    </div>
  );
};
