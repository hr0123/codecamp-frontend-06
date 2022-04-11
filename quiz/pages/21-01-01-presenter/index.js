// 아래의 함수형 컴포넌트 불러오는 방식을 함수 자체를 불러오는 방식으로 변경해 보세요.

// presenter 부분
// export default function Presenter(props) {
//   return <div>{props.child}</div>;
// }
export default function Presenter(aaa) {
  return <div>{aaa.child}</div>;
}
