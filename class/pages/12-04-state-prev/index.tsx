import { useState } from "react";

export default function StatePrevPage() {
  const [count, setCount] = useState(0);

  const onClickCount = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);  // 결과: 버튼 클릭 시 +1됨
    setCount((prev) => prev + 1); // prev=초기값 -> +1되어 -> 임시저장공간으로(=1)
    setCount((prev) => prev + 1); // prev=임시저장공간에 있는것(=1) -> +1되어 -> 임시저장공간으로(=2)
    setCount((prev) => prev + 1); // prev=임시저장공간에 있는것(=2) -> +1되어 -> 임시저장공간으로(=3)
    setCount((prev) => prev + 1); // prev=임시저장공간에 있는것(=3) -> +1되어 -> 임시저장공간으로(=4) -> 결과: 버튼 한번 클릭 시 +4됨
  };

  return (
    <div>
      <div>현재 카운트: {count}</div>
      <button onClick={onClickCount}>카운트 올리기</button>
    </div>
  );
}
