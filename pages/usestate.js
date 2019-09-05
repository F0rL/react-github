import { useState, useEffect, useReducer } from "react";

const C = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <h2>learning Hooks</h2>
      <p>{count}</p>
    </div>
  );
};

export default C;
