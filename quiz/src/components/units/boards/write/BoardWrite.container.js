import BoardWriteUI from './BoardWrite.presenter'

import {useRouter} from 'next/router'
import {useState} from 'react'

export default function BoardWrite() {
   const [isActive1,setIsActive1] = useState(false)
   const [isActive2,setIsActive2] = useState(false)
   const [isActive3,setIsActive3] = useState(false)

   const router = useRouter()

   const onClickMove1 = () => {  
      router.push("/06-02-dynamic-board-detail/83011")  //http://localhost:3000이 앞에 생략돼있으므로 폴더명만 입력
      setIsActive1(true)
   }
   const onClickMove2 = () => {
      router.push("/06-02-dynamic-board-detail/83012")
      setIsActive2(true)  
   }
   const onClickMove3 = () => {
      router.push("/06-02-dynamic-board-detail/83013")  
      setIsActive3(true)
   }
   
   return (
      <BoardWriteUI
         onClickMove1={onClickMove1}
         onClickMove2={onClickMove2}
         onClickMove3={onClickMove3}
         isActive1={isActive1}
         isActive2={isActive2}
         isActive3={isActive3}
      />
   )
}



