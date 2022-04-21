// 싸이월드 때!
// setTimeout(() => {
//   console.log("안녕하세요!");
// }, 1000);
// setInterval(() => {
//   document.getElementById("timer")?.innerText = "59:30";
// }, 1000);

export default function EventLoopPage() {
  const onClickTimer = () => {
    console.log("=========== 시작!!! ===========");

    setTimeout(() => {
      console.log("0초 뒤에 실행될거에요!!!");
    }, 0);

    // 아래 로직 실행되는 시간이 setTimeout에서 정한 시간(ex.0,1000)을 넘기면->setTimeout실행안됨(TaskQueue에서 CallStack으로 못올라와서)
    let sum = 0;
    for (let i = 0; i <= 9000000000; i += 1) {
      sum = sum + 1;
    }

    console.log("=========== 끝!!! ===========");
  };

  return <button onClick={onClickTimer}>setTimeout 실행시키기!!!</button>;
}
