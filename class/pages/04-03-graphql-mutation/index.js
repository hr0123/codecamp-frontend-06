// import axios from 'axios'   //★rest-api 방식
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'

//Playground에서 한 내용을 복붙해와서, 선언 및 할당
const CREATE_BOARD = gql`
   mutation {
      createBoard(
         writer: "철수",
         title: "제목",
         contents: "내용"
      ) {
         _id
         number
         message
      }
   }
`
//웹에서 확인 위해 export default -> package.json 들어간 후 -> 터미널에 yarn dev
export default function GraphqlMutationPage() {  
   const [data,setData] = useState("")
   const [callApi] = useMutation(CREATE_BOARD)

   const callGraphqlApi = async () => {  //화살표 함수
      // const result = await axios.get("https://koreanjson.com/posts/1")   //★rest-api 방식
      const result = await callApi()
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