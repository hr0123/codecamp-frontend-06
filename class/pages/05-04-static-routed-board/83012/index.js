//▶게시글 number별 페이지2◀

import {useQuery,gql} from '@apollo/client'

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

export default function StaticRoutedPage() {
   const {data} = useQuery (FETCH_BOARD, {
      variables: {number:83012}
   })
   console.log(data)

   return (
      // <>
      //    {/* ▶조건부Rendering◀ data있으면 &&앞부분(=undefined=정보없음), data없으면 &&뒷부분(=BE에서 받아온 정보=number,writer,title,contents...)을 보여줌 => 화면에 시간차 두고 뜸*/}
      //    <div>{data && data.fetchBoard.number}번 게시글에 오신 것을 환영합니다!!!</div>
      //    <div>작성자 : {data && data.fetchBoard.writer}</div>
      //    <div>제목 : {data && data.fetchBoard.title}</div>
      //    <div>내용 : {data && data.fetchBoard.contents}</div>
      // </>
      <>
         {/* ▶Optional-Chaining◀ data있으면->?.앞부분(=data=undefined=정보없음), data없으면->?제외(=BE에서 받아온 정보=number,writer,title,contents...)을 보여줌 => 화면에 시간차 두고 뜸*/}
         <div>{data?.fetchBoard.number}번 게시글에 오신 것을 환영합니다!!!</div>
         <div>작성자 : {data?.fetchBoard.writer}</div>
         <div>제목 : {data?.fetchBoard.title}</div>
         <div>내용 : {data?.fetchBoard.contents}</div>
      </>
   )
}