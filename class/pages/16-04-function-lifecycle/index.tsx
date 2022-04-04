// 함수형 컴포넌트
import { Component, createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

interface IState {
  count: number;
}

export default function CounterPage() {
  // 1.인풋태그를 담을 변수inputRef를 만듬
  // inputRef = createRef<HTMLInputElement>();
  const inputRef = useRef<HTMLInputElement>(null);

  // state = {
  //   count: 99,
  // };
  const [count, setCount] = useState(99);

  const router = useRouter();

  // 1.DidMount
  // componentDidMount() {
  //   console.log("마운트됨!!!");
  //   // 3.포커스 깜빡깜빡
  //   this.inputRef.current?.focus();
  // }

  // useEffect(() => {
  //   console.log("마운트됨!!!");
  //   inputRef.current?.focus();
  // }, []);

  // 2.DidUpdate
  // componentDidUpdate() {
  //   console.log("수정되고 다시 그려짐!!!");
  // }
  useEffect(() => {
    console.log("수정되고 다시 그려짐!!!");
  });

  // 3.WillUnmount
  // componentWillUnmount() {
  //   console.log("컴포넌트 사라짐!!!");
  //   //채팅방 나가기
  //   //api 요청!!!
  // }

  // useEffect(() => {
  //   return () => {
  //     console.log("컴포넌트 사라짐!!!");
  //   };
  // }, []);

  // 4.DidMount(처음부터 실행됨)와 WillUnmount(처음에는 실행안됨)를 합치기
  useEffect(() => {
    console.log("마운트됨!!!");
    inputRef.current?.focus();
    return () => {
      console.log("컴포넌트 사라짐!!!");
    };
  }, []);

  // 5.useEffect의 잘못된 사용 예 (1)추가렌더링: useEffect 안에서 setState하는 것을 피해야함
  // useEffect(() => {
  //   setCount(10);
  // }, []);

  // 5.useEffect의 잘못된 사용 예 (2)무한루프
  // useEffect(() => {
  //   setCount((prev) => prev + 1);
  // }, [count]);

  const onClickCounter = () => {
    // console.log(this);
    // console.log(this.state.count);
    // this.setState((prev: IState) => ({ count: prev.count + 1 }));
    setCount((prev) => prev + 1);
  };

  const onClickMove = () => {
    router.push("/");
  };

  console.log("나는 언제 실행되게?!!");

  return (
    <div>
      {/* 2.위에서 만든 inputRef에 인풋태그를 담음 */}
      <input type="text" ref={inputRef} />
      <div>현재 카운트:{count}</div>
      <button onClick={onClickCounter}>카운트 올리기!</button>
      <button onClick={onClickMove}>나가기!!</button>
    </div>
  );
}
