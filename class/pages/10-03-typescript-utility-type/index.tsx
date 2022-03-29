export default function TypescriptPage(){

  interface IProfile {
     name:string
     age:number
     school:string
     hobby?:string
  }
  //📌utility type: 만든 type명에 마우스올려 확인
  //1.Pick타입
  type Mytype1 = Pick<IProfile, 'name'|'age'>
  //2.Omit타입(제외)
  type Mytype2 = Omit<IProfile, 'school'>
  //3.Partial타입(전부,?)
  type Mytype3 = Partial<IProfile>
  //4.Required타입(전부,?없이)
  type Mytype4 = Required<IProfile>
  //5.Record타입
  type ZZZ = "aaa" | "qqq" | "rrr"  //Union(합집합)타입
  // let apple: ZZZ
  // apple = "qqq"
  type Mytype5 = Record<ZZZ,IProfile>  //ZZZ의 각각이 Mytype5의 KEY, 각VALUE는 IProfile이 됨
  
  
  //📌type VS interface 차이점: 선언병합(기존에 있던 동명으로 또 만들면->자동으로 하나로 합쳐짐)
  interface IProfile {
     candy: number
  }
  let profile: IProfile
  profile = {
     candy: 3,
     age: 10,
     hobby: "영화"
  }


  return <div>타입스크립트 연습하기!!</div>
}