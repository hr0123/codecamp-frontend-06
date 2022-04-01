import { useState } from "react";
import Child1 from "../../src/components/units/boards/14-04-lifting-state-up/Child1";
import Child2 from "../../src/components/units/boards/14-04-lifting-state-up/Child2";

export default function LiftingStateUpPage() {
  const [count, setCount] = useState(0);

  // 방법1: Child1,2 / 방법2: Child2
  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      {/* 방법1 */}
      {/* <Child1 count={count} onClickCountUp={onClickCountUp} /> */}
      {/* 방법2 */}
      <Child1 count={count} setCount={setCount} />
      <div>=============================================</div>
      <Child2 count={count} onClickCountUp={onClickCountUp} />
    </div>
  );
}

// =>자식1과 자식2의 카운트가 동시에 올라감
