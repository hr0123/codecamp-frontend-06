// 아래의 코드가 정상적으로 작동하지 않습니다. 제대로 작동하도록 만들어 보세요. 단, qwer은 변경하지 않습니다.
import { useState } from "react";

export default function StatePage() {
  const [state, setState] = useState(0);

  const onClickCount = () => {
    setState((qwer) => qwer + 1);
  };

  return (
    <>
      <button onClick={onClickCount}>카운트 올리기</button>
      <div>{state}</div>
    </>
  );
}
