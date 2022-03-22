// 1. [ GRAPHQL-API 요청하기 ] 라는 버튼을 만들고, 이 버튼을 클릭했을 때
//    createBoard 라는 API에 mutation을 요청해서 프로필을 등록해 보세요.(작성자, 제목, 내용은 하드코딩합니다.)
// 2. 위 3번에서 등록한 데이터를 console.log()로 출력해 보세요.
// 3. 위 3번에서 등록한 데이터를 playground에서 fetchBoard 를 요청해서 정말 등록이 되었는지 확인해 보세요.

import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'

const CREATE_BOARD = gql`
   mutation {
      createBoard (writer: "이해리", title: "4일차 과제", contents: "graphql-API 실습") {
         _id
         number
         message
      }
   }
`

export default function GraphqlBoardPage() {  
   const [data,setData] = useState("")   
   const [createBoard] = useMutation(CREATE_BOARD)

   const onclickGqlApi = async () => {  
      const result = await createBoard()  
      console.log(result)
      console.log(result.data.createBoard.message)  
      setData(result.data.createBoard.message)
   }
   
   return (
      <>
         <div>{data}</div>         
         <button onClick={onclickGqlApi}>GRAPHQL-API 요청하기</button>
      </>
   )
}