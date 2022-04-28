import { memo } from "react";

function MemoizationPresenterPage() {
  console.log("프리젠터가 렌더링됩니다!!!");
  return (
    <div>
      <div>===========================</div>
      <h1>이것은 프리젠터 입니다!!!</h1>
      <div>===========================</div>
    </div>
  );
}
export default memo(MemoizationPresenterPage);
// ↑부모 컴포넌트가 변경되더라도 자식 컴포넌트가 변경되지 않도록 자식 컴포넌트에 memo를 적용
