import { useState, useEffect, useReducer } from "react";
function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
  }
}

const D = () => {
  const [count, dispatchCount] = useReducer(countReducer, 0);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCount({ type: "add" });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <h2>learning Hooks useReducer</h2>
      <p>{count}</p>
    </div>
  );
};

export default D;
