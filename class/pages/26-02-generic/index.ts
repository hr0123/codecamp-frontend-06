// 1.문자타입(인자,결과)
const getString = (arg: string): string => {
  return arg;
};
const result1 = getString("철수");

// 2.숫자타입(인자,결과)
const getNumber = (arg: number): number => {
  return arg;
};
const result2 = getNumber(8);

// 3.any타입(결과의 타입이 any로, 알 수 없는 상태)
const getAny2 = (arg: any): any => {
  return arg;
};
const result3_1 = getAny2("철수");
const result3_2 = getAny2(8);
const result3_3 = getAny2(true);

// 4.any타입2(결과의 타입이 any로, 알 수 없는 상태)
const getAnys = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  return [arg3, arg2, arg1];
};
const result4 = getAnys("철수", "다람쥐초등학교", 8);

// 5.generic타입 : 어떤 타입인지 알수없으나, 인자가 한번 들어오면 그 들어온 인자의 타입을 그대로 (인자&결과)일괄 사용 => any와 달리, 결과타입 예측 가능
function getGeneric<MyType>(arg: MyType): MyType {
  return arg;
}
const aaa: string = "철수";
const bbb: number = 8;
const ccc: boolean = true;
const result5_1 = getGeneric(aaa);
const result5_2 = getGeneric(bbb);
const result5_3 = getGeneric(ccc);

// 6.generic타입2
// prettier-ignore
function getGenerics<MyType1, MyType2, MyType3>(arg1:MyType1, arg2:MyType2, arg3:MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}
const result6 = getGenerics("철수", "다람쥐초등학교", 8);

// 7.generic - 축약1(6과 같은 함수, 이름만 수정)
// prettier-ignore
function getGenericsT<T1, T2, T3>(arg1:T1, arg2:T2, arg3:T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
const result7 = getGenericsT("철수", "다람쥐초등학교", 8);

// 8.generic - 축약2(6과 같은 함수, 이름만 수정) (*타입 지정한 인자 넣어서 함수 실행)
// prettier-ignore
function getGenericsTUV<T, U, V>(arg1:T, arg2:U, arg3:V): [V, U, T] {
  return [arg3, arg2, arg1];
}
const result8 = getGenericsTUV<string, string, number>(
  "철수",
  "다람쥐초등학교",
  8
);

// 9. useState에서의 generic
// const [school, setSchool] = useState<string>("다람쥐초등학교")
// const apple: number = 3;
// console.log(apple);

// 10.화살표함수에서의 generic
// const  getGenericsTUV = <T, U, V>(arg1:T, arg2:U, arg3:V): [V, U, T] => {
//   return [arg3, arg2, arg1];
// }
