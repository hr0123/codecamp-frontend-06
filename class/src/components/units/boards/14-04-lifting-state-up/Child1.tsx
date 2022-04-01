// import { useState } from "react";

export default function Child1(props) {
  // const [count, setCount] = useState(0);

  // const onClickCountUp = () => {
  //   setCount((prev) => prev + 1);
  // };

  // 방법2
  const aaa = () => {
    props.setCount((prev) => prev + 1);
  };

  return (
    <div>
      <div>자식1의 카운트: {props.count}</div>
      {/* 방법1 */}
      {/* <button onClick={props.onClickCountUp}>카운트 올리기</button> */}
      {/* 방법2 */}
      <button onClick={aaa}>카운트 올리기</button>
    </div>
  );
}
