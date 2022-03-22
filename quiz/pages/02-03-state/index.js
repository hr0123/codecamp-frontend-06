import { useState } from "react"

export default function TokenStatePage() {

   const[token,setToken]=useState("000000")

   function onClickToken() {
      setToken(String(Math.floor(Math.random()*1000000)).padStart(6,"0"))
   }

   return(
      <>
         <div>{token}</div>
         <button onClick={onClickToken}>인증번호 전송</button>
      </>
   )

}