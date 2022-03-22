// import axios from 'axios'
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'

// Playground에서 한 내용을 복붙해와서, 선언 및 할당
// 일괄 적용 위해 맨 먼저 타입 입력
const CREATE_BOARD = gql`
   mutation createBoard($writer: String, $title: String, $contents: String) {
      createBoard(writer: $writer, title: $title, contents: $contents) {
         _id
         number
         message
      }
   }
`
export default function GraphqlMutationPage() {  //웹에서 확인 위해 export default -> package.json 들어간 후 -> 터미널에 yarn dev
   const [data,setData] = useState("")
   const [callApi] = useMutation(CREATE_BOARD)

   const callGraphqlApi = async () => {  //화살표 함수 형식
      // const result = await axios.get("https://koreanjson.com/posts/1")  //★rest-api 방식
      const result = await callApi({  //★graphql-api 방식
         variables: {writer: "철수", title: "제목", contents: "내용"}
      })  
      console.log(result)
      console.log(result.data.createBoard.message)  //콘솔에서 결과값 하위항목 버튼 눌러서 확인
      setData(result.data.createBoard.message)
   }

   return (
      <>
         <div>{data}</div>
         <button onClick={callGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
      </>
   )
}