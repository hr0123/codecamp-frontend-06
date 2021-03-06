export default function TypescriptPage(){

  interface IProfile {
     name:string
     age:number
     school:string
     hobby?:string
  }
  //๐utility type: ๋ง๋  type๋ช์ ๋ง์ฐ์ค์ฌ๋ ค ํ์ธ
  //1.Pickํ์
  type Mytype1 = Pick<IProfile, 'name'|'age'>
  //2.Omitํ์(์ ์ธ)
  type Mytype2 = Omit<IProfile, 'school'>
  //3.Partialํ์(์ ๋ถ,?)
  type Mytype3 = Partial<IProfile>
  //4.Requiredํ์(์ ๋ถ,?์์ด)
  type Mytype4 = Required<IProfile>
  //5.Recordํ์
  type ZZZ = "aaa" | "qqq" | "rrr"  //Union(ํฉ์งํฉ)ํ์
  // let apple: ZZZ
  // apple = "qqq"
  type Mytype5 = Record<ZZZ,IProfile>  //ZZZ์ ๊ฐ๊ฐ์ด Mytype5์ KEY, ๊ฐVALUE๋ IProfile์ด ๋จ
  
  
  //๐type VS interface ์ฐจ์ด์ : ์ ์ธ๋ณํฉ(๊ธฐ์กด์ ์๋ ๋๋ช์ผ๋ก ๋ ๋ง๋ค๋ฉด->์๋์ผ๋ก ํ๋๋ก ํฉ์ณ์ง)
  interface IProfile {
     candy: number
  }
  let profile: IProfile
  profile = {
     candy: 3,
     age: 10,
     hobby: "์ํ"
  }


  return <div>ํ์์คํฌ๋ฆฝํธ ์ฐ์ตํ๊ธฐ!!</div>
}