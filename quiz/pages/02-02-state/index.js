import { useState } from "react"

export default function CounterStatePage() {

   const[count,setCount]=useState(0)

   function onClickCounter() {
      setCount(count + 1)
   }

   return(
      <>
         <div>{count}</div>
         <button onClick={onClickCounter}>카운트올리기</button>
      </>
   )

}