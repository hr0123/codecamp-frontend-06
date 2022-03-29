export default function TypescriptPage(){
  //타입 추론(첫 입력값의 데이어터타입으로 자동으로 타입 정해짐)
  let aaa = "안녕하세요"   
  aaa = 3

  //타입 명시
  let bbb: string = "반갑습니다"

  //문자타입 명시
  let ccc: string   //먼저 명시만 하고, 추후 할당도 가능
  ccc = 3
  ccc = "문자만"

  //숫자타입 명시
  let ddd: number = 10
  ddd = "숫자만"

  //boolean타입 명시
  let eee: boolean = true
  eee = false
  eee = "따옴표없이"
  eee = "false"  //true로 작동함(??)
  
  //배열 타입 명시
  let fff: number[] = [1,2,3,4,5,"숫자만"]
  let ggg: string[] = ["철수","영희","훈이",99]
  let hhh: (number | string)[] = [1,2,3,"문자숫자 다 가능"]   //숫자 혹은 문자 타입 배열

  //객체 KEY별 타입 추론
  // let profile = {
  //    name:"철수",
  //    age:8,
  //    school:"다람쥐초등학교"
  // }
  // profile.age = "8살"  //error_숫자만 가능

  //객체 KEY별 타입 명시
  interface IProfile {
     name: string
     age: string | number
     school: string
     hobby?: string   //KEY?는 객체 안에 없어도됨
  }
  let profile: IProfile = {
     name:"철수",
     age:8,
     school:"다람쥐초등학교"  
  }
  profile.age = "8살"
  profile.school = 123

  //함수 요소 및 반환값 타입 명시
  const add = (money1:number, money2:number, unit:string): string => {  //(): return값의 타입 => {}
     return money1 + money2 + unit
  }
  add(1000,2000,"원")   //결과:"3000원"

  return <div>타입스크립트 연습하기!!</div>
}