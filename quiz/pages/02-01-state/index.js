import { useState } from "react"

export default function HelloStatePage() {

   const[hello,setHello]=useState("안녕하세요")

   function onClickHello() {
      setHello("반갑습니다")
   }

   return(
      <>
         <button onClick={onClickHello}>{hello}</button>
      </>
   )

}