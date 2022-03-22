//▶버튼눌러 여러 게시글로 각각 이동◀

import {useRouter} from 'next/router'

export default function StaticRoutingPage() {
   const router = useRouter()

   const onClickMove1 = () => {   //함수명에 숫자 가능
      router.push("/05-04-static-routed-board/83011")  //http://localhost:3000이 앞에 생략돼있으므로 폴더명만 입력
   }
   const onClickMove2 = () => {
      router.push("/05-04-static-routed-board/83012")  
   }
   const onClickMove3 = () => {
      router.push("/05-04-static-routed-board/83013")  
   }

   return (
      <div>
         <button onClick={onClickMove1}>83011번 게시글로 이동하기!!!</button>
         <button onClick={onClickMove2}>83012번 게시글로 이동하기!!!</button>
         <button onClick={onClickMove3}>83013번 게시글로 이동하기!!!</button>
      </div>
   )
}