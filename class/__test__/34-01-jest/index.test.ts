import { add } from "../../pages/34-01-jest/index";

it("더하기 잘되는지 테스트해보기", () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

// describe("나만의 테스트 그룹 만들기",()=>{
//   it("내가 하고싶은 테스트-1", () => {

//   });
//   it("내가 하고싶은 테스트-2", () => {

//   });
//   it("내가 하고싶은 테스트-3", () => {

//   });
// })
