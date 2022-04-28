import { useCallback, useMemo, useState } from "react";
import MemoizationPresenterPage from "./presenter";

export default function MemoizationContainerPage() {
  console.log("컨테이너가 렌더링됩니다!!!");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // 7. 부모 컴포넌트에 선언되어 있는 함수들이 모두 다시 생성되지 않도록 useCallback을 적용
  const onClickCountLet = useCallback(() => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  // 6.부모 컴포넌트에 선언되어 있는 let count가 다시 생성되지 않도록 useMemo를 적용
  // const onClickCountState = useMemo(() => {
  //   console.log(countState + 1);
  //   setCountState(countState + 1);
  // }, []);

  // 8.state를 기억하지 못하도록 prev를 사용하여 기억시켜 주기
  // const onClickCountState = useCallback(() => {
  //   setCountState((prev) => prev + 1);
  // }, []);

  // 9.useMemo를 활용하여 함수를 기억하도록 만들기
  const onClickCountState = useMemo(() => {
    console.log(countState + 1);
    setCountState((prev) => prev + 1);
  }, []);

  return (
    <div>
      <div>===========================</div>
      <h1>이것은 컨테이너입니다!!!</h1>
      <div>카운트(let): {countLet}</div>
      <button onClick={onClickCountLet}>카운트(let) +1 올리기!!</button>
      <div>카운트(state): {countState}</div>
      <button onClick={onClickCountState}>카운트(state) +1 올리기!!</button>
      {/* <button onClick={()=>{setCountState((prev) => prev + 1)}}>카운트(state) +1 올리기!!</button> */}
      <div>===========================</div>
      <MemoizationPresenterPage countState={countState} />
    </div>
  );
}
