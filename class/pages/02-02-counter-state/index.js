import {useState} from 'react'

export default function CounterStatePage() {
   
   const [count,setCount] = useState(0)

   function counter() {
      setCount(count + 1)  //count가 0에서 1(0+1)로
   }

   return(
      <div>
         <div>{count}</div>
         <button onClick={counter}>카운트 올리기!!!</button>
      </div>
   )
   
}

//let이 안되는 사례
// import { useState } from 'react'

// export default function CounterStatePage(){
//     let count = 0

//     function counter(){
//         count = count + 1
//         console.log(count)
//     }

//     return (
//         <div>
//             <div>{count}</div>
//             <button onClick={counter}>카운트 올리기!!!</button>
//         </div>
//     )
// }


//스코프 체인 사례
// import { useState } from 'react'

// export default function CounterStatePage(){
//     let count = 0
//     const apple = 3

//     function counter(){

//         console.log(apple)

//         count = count + 1
//         console.log(count)
//     }

//     return (
//         <div>
//             <div>{count}</div>
//             <button onClick={counter}>카운트 올리기!!!</button>
//         </div>
//     )
// }