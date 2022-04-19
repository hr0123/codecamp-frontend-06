// 1.any타입(그냥 자바스크립트랑 같음) : 어느 타입이든 가능 / 인자도 결과도 타입 예측불가
const getAny = (args: any) => {
  return args + 2;
};
const result1 = getAny("철수");

// 2.unknown타입(개발자에게 안전하게 코딩하도록 유도) : 현재는 모르고, 상황에 따라 코딩(타입별로 리턴값 각각 지정해줘야함) / 결과 타입 예측 가능(지정한 타입 상황들 중 하나가 리턴될 것)
const getUnknown = (args: unknown) => {
  if (typeof args === "number") {
    return args + 2;
  } else {
    return "숫자를 넣어주세요!!";
  }
};
const result2 = getUnknown("철수");
