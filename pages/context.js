import { useState, useEffect, useReducer, useLayoutEffect, useContext } from "react";
import MyContext from '../lib/my-context'

function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
  }
}

const E = () => {
  const [count, dispatchCount] = useReducer(countReducer, 0);
  const [name, setName] = useState('kuma')

  const context = useContext(MyContext)

  useEffect(() => {
    console.log('effect invoked')
    return () => {
      console.log('effect deteched')
    };
  },[count])
  //useEffect:数组里面的内容更新才会重新执行effect deteched =>effect invoked

  // 更新到dom之前执行，如果执行时间太长，会影响到渲染，用户感觉卡
  useLayoutEffect(() => {
    console.log('useLayoutEffect invoked')
    return () => {
      console.log('useLayoutEffect deteched')
    };
  },[count])
  return (
    <div>
      <h2>learning Hooks context</h2>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <p>{count}</p>
      <button onClick={()=> dispatchCount({type: 'add'})}>点击</button>
      <p>context: {context}</p>
    </div>
  );
};

export default E;
