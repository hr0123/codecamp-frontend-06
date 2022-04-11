// 아래의 함수형 컴포넌트 불러오는 방식을 함수 자체를 불러오는 방식으로 변경해 보세요.
// container 부분
import Presenter from "../21-01-02-presenter";

export default function Container() {
  return <>{Presenter({ child: "철수", age: 13 })}</>;
}
