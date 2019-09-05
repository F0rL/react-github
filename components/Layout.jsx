import Link from "next/link";
import { Button } from "antd";
import {Fragment} from 'react'
export default ({ children }) => (
  <Fragment>
    <header>
      <Link href="/a?id=1" as="/a/1">
        <Button>to a</Button>
      </Link>
      <Link href="/b">
        <Button>to b</Button>
      </Link>
      <Link href="/c">
        <Button>to c</Button>
      </Link>
    </header>
    {children}
  </Fragment>
);
