import { useState } from "react"

export default function SignupStatePage() {

   const[email,setEmail]=useState("")
   function onChangeEmail(event) {
      setEmail(event.target.value)
   }

   const[emailError,setEmailError]=useState("")
   
   const[password,setPassword]=useState("")
   function onChangePassword(event) {
      setPassword(event.target.value)
   }

   const[passwordCheck,setPasswordCheck]=useState("")
   function onChangePasswordCheck(event) {
      setPasswordCheck(event.target.value)
   }

   const[passwordError,setPasswordError]=useState("")

   function onClickSignup() {

      if(email.includes("@")===false) {
         setEmailError("이메일이 올바르지 않습니다.")
      } else {
         setEmailError("")
      }

      if(password !== passwordCheck) {
         setPasswordError("비밀번호가 다릅니다.")
      } else {
         setPasswordError("")
      }

   }

   return(
      <>
         <div>이메일</div>
         <input type="text" onChange={onChangeEmail}></input>
         <div style={{color: 'red'}}>{emailError}</div>
         <div>비밀번호</div>
         <input type="password" onChange={onChangePassword}></input>
         <div>비밀번호 확인</div>
         <input type="password" onChange={onChangePasswordCheck}></input>
         <div style={{color: 'red'}}>{passwordError}</div>
         <button onClick={onClickSignup}>가입하기</button>
      </>
   )

}