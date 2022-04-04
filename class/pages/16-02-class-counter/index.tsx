// 컴포넌트 기능 가진 Class(<->함수형 컴포넌트)
import { Component } from "react";

interface IState {
  count: number;
}
export default class CounterPage extends Component {
  state = {
    count: 99,
  };

  // 동적스코프 => this에 매번 달라지는 실행주체가 들어옴
  // onClickCounter() {
  //   console.log(this.state.count);
  //   this.setState((prev: IState) => ({ count: prev.count + 1 }));
  // }
  // 화살표함수로 변경 시 => this가 언어적 => 고정
  onClickCounter = () => {
    console.log(this.state.count);
    this.setState((prev: IState) => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div>
        <div>현재 카운트:{this.state.count}</div>
        {/* <button onClick={this.onClickCounter.bind}>카운트 올리기!</button> */}
        <button onClick={this.onClickCounter}>카운트 올리기!</button>
      </div>
    );
  }
}
