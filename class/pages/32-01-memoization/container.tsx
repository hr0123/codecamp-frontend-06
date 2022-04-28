import { useCallback, useMemo, useState } from "react";
import MemoizationPresenterPage from "./presenter";

export default function MemoizationContainerPage() {
  console.log("컨테이너가 렌더링됩니다!!!");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // const aaa = Math.random();
  // console.log(aaa); // "카운트(state) +1 올리기!!" 누를때마다 랜덤숫자 새로뜸
  const aaa = useMemo(() => Math.random(), []); //📌useMemo보다 useCallback을 주로 사용
  console.log(aaa); // "카운트(state) +1 올리기!! 눌러도 랜덤숫자 그대로

  const onClickCountLet = useCallback(() => {
    console.log(countLet + 1);
    countLet += 1; // countLet=countLet+1
  }, []);

  // const onClickCountState = useCallback(() => {
  //   //📌useCallback안에서 state직접 사용하면 안됨-기존값(prev)가져와야함 => "카운트(state): "증가됨
  //   // console.log(countState + 1);
  //   // setCountState(countState + 1);
  //   setCountState((prev) => prev + 1);
  // }, []);

  // useMemo로 useCallback함수 만들어보기!!(위에 동일명 함수 주석함)
  const onClickCountState = useMemo(() => {
    // 리턴하는 값을 memoization함
    console.log(countState + 1);
    setCountState(countState + 1); //이렇게 하면=>리렌더 안되는거 콘솔에서 확인
    // setCountState((prev) => prev + 1);
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
