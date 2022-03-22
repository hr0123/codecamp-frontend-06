import {useState} from 'react'

export default function SignupStatePage() {
   const [email,setEmail] = useState("") //이메일 초기값 빈문자열로 설정
   // const [emailError, setEmailError] = useState("")  //★★이메일 입력칸 밑에 에러알림칸
   const [password,setPassword] = useState("") //비밀번호 초기값 빈문자열로 설정

   function onChangeEmail(event) {
      //event.target -> 태그 전체 <input type="text" onChange={onChangeEmail}/>
      //event.target.value -> 입력한 값 (ex. sss@eee.com)
      setEmail(event.target.value)
   }

   function onChangePassword(event) {
      setPassword(event.target.value)
   }

   function onClickSignup() {
      //포장이 잘 됐는지 확인
      console.log(email)
      console.log(password)
      //email에 @ 포함 확인
      if(email.includes("@") === false) {
         alert("이메일이 올바르지 않습니다!! @가 없음!!")
         // setEmailError("이메일이 올바르지 않습니다!! @가 없음!!")  //★★위에 alert 대신
      } else {
         alert("회원가입을 축하합니다!!!")
      }
   }

   return (
      <div>
         이메일: <input type="text" onChange={onChangeEmail}/><br />
         {/* // <div>{emailError}</div>  //★★이메일 입력칸 밑에 에러 알림칸  */}
         비밀번호: <input type="password" onChange={onChangePassword}/><br />
         <button onClick={onClickSignup}>회원가입</button>
      </div>
   )

}