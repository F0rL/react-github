import {
  useState,
  useEffect,
  useReducer,
  useLayoutEffect,
  useContext,
  memo,
  useMemo,
  useCallback
} from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
  }
}

function MyCount() {
  const [count, dispatchCount] = useReducer(countReducer, 0);
  const [name, setName] = useState("kuma");

  const config = useMemo(()=>({
    text: `count is ${count}`,
    color: count > 3 ? "red" : "blue"
  }),[count]);

  const handleButtonClick = useCallback(() => dispatchCount({ type: "add" }),[])
  // useMemo 也可使实现 useCallback
  // const handleButtonClick = useMemo(() => ()=>dispatchCount({ type: "add" }), [])
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child
        config={config}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}

// config每次都是一个新的对象，使用useMemo限制
// 直接传入Child，每次触发不同的dispatchCount
// 使用useMemo useCallback优化
const Child = memo(function Child({ onButtonClick, config }) {
  console.log("child render");
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
})

export default MyCount;
