import { useMoveToPage } from "../../src/components/commons/hooks/useMoveToPage";

export default function CustomHooksUseMoveToPage() {
  // 여러 컴포넌트의 컨테이너들이 공통적으로 사용하는 부분은 custom-hooks로 뺴서 임폴트해와서 사용

  // useMoveToPage();
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <div>
      <button onClick={onClickMoveToPage("/board")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/market")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/mypage")}>마이페이지로 이동</button>
    </div>
  );
}
