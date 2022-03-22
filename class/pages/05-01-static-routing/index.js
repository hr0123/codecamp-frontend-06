//▶버튼눌러 다른 페이지로 이동◀

import {useRouter} from 'next/router'

export default function StaticRoutingPage() {
   const router = useRouter()

   const onClickMove = () => {
      router.push("/05-02-static-routed") //http://localhost:3000이 앞에 생략돼있으므로 폴더명만 입력
   }

   return (
      <button onClick={onClickMove}>페이지 이동하기!!!</button>
   )
}