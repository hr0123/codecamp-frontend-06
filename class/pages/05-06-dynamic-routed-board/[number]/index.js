//▶게시글 number별 페이지1◀

import {useQuery,gql} from '@apollo/client'
import {useRouter} from 'next/router'

const FETCH_BOARD = gql`
   query fetchBoard($number:Int){
      fetchBoard(number:$number){
         number
         writer
         title
         contents
      }
   }
`

export default function DynamicRoutedPage() {
   const router = useRouter()
   console.log(router)

   const {data} = useQuery (FETCH_BOARD, {
      variables: {number : Number(router.query.number)}  //83013
   })
   console.log(data)

   return (
      <>
         {/* ▶Optional-Chaining◀ data있으면->?.앞부분(=data=undefined=정보없음), data없으면->?제외(=BE에서 받아온 정보=number,writer,title,contents...)을 보여줌 => 화면에 시간차 두고 뜸*/}
         <div>{data?.fetchBoard.number}번 게시글에 오신 것을 환영합니다!!!</div>
         <div>작성자 : {data?.fetchBoard.writer}</div>
         <div>제목 : {data?.fetchBoard.title}</div>
         <div>내용 : {data?.fetchBoard.contents}</div>
      </>
   )
}