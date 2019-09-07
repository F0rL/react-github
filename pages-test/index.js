import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";
import { connect } from "react-redux";
import {add} from '../store'

const events = [
  "routeChangeStart",
  "routeChangeComplete",
  "routeChangeError",
  "beforeHistoryChange",
  "hashChangeStart",
  "hashChangeComplete"
];
function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args);
  };
}
events.forEach(event => {
  Router.events.on(event, makeEvent(event));
});

const Index = ({count,name,changeNum}) => {
  return (
    <div>
      <h2>index page</h2>
      <span>count:{count}</span>
      <span>name:{name}</span>
      <button onClick={() => changeNum(10)}>+10</button>
    </div>
  );
};
Index.getInitialProps = async ({reduxStore}) => {
  reduxStore.dispatch(add(5))
  return {}
}

const mapStateToProps = (state) => {
  return {
    count: state.COUNT.count,
    name: state.NAME.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeNum(num) {
      dispatch({type: 'count/ADD_COUNT',num})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index)
