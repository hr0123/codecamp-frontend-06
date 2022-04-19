// 1.HOF - 일반 타입(타입 명시)
function firstFunc1(arg1: string) {
  return function secondFunc1(arg2: number): [string, number] {
    return [arg1, arg2];
  };
}
const result1 = firstFunc1("영희")(8); //["영희",8]

// 2.HOF - any타입
function firstFunc2(arg1: any) {
  return function secondFunc2(arg2: any): [any, any] {
    return [arg1, arg2];
  };
}
const result1 = firstFunc2("영희")(8); //["영희",8]

// 3.HOF - generic타입 : 들어오는 인자의 타입에 따라, 결과의 타입이 정해지므로 => 결과의 타입을 예측 가능
function firstFunc3<T>(arg1: T) {
  return function secondFunc3<U>(arg2: U): [T, U] {
    return [arg1, arg2];
  };
}
const result1 = firstFunc3("영희")(8); //["영희",8]

// prettier-ignore
// 4.HOF - generic타입(화살표 함수)
// const firstFunc4 = <T>(arg1: T) => {
//   return const secondFunc4 = <U>(arg2: U): [T, U] => {
const firstFunc4 = <T>(arg1: T) => <U>(arg2: U): [T, U] => {
    return [arg1, arg2];
//   };
  };

const result1 = firstFunc4("영희")(8); //["영희",8]

// prettier-ignore
// 5.HOF - generic타입(컴포넌트에 응용해보기_HOC)
const withAuth = <C>(Component: C) => <P>(props: P): [C, P] => {
    return [Component, props];
  };

const result1 = withAuth("Bbb")({ aaa: "철수" }); //["영희",8]
