// import axios from 'axios'
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'

// Playground에서 한 내용을 복붙해와서, 선언 및 할당
// Playground Docs 보고 데이터타입 입력(일괄 적용 가능케 할려고)
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
   const [myWriter,setMyWriter] = useState("")
   const [myTitle,setMyTitle] = useState("")
   const [myContents,setMyContents] = useState("")
      
   const [createBoard] = useMutation(CREATE_BOARD)

   const callGraphqlApi = async () => {  //화살표 함수 형식
      // const result = await axios.get("https://koreanjson.com/posts/1")  //★rest-api 방식
      const result = await createBoard({  //★graphql-api 방식
         variables: {writer: myWriter, title: myTitle, contents: myContents}
      })  
      console.log(result)   //콘솔에 result 띄우기 : 하위항목명 확인 위함
      console.log(result.data.createBoard.message)  //콘솔에 띄우기 : result의👉data의👉createBoard의👉message
      setData(result.data.createBoard.message)
   }

   const onChangeWriter = (event) => {  //이벤트 핸들러 함수
      setMyWriter(event.target.value)
   }
   const onChangeTitle = (event) => {
      setMyTitle(event.target.value)
   }
   const onChangeContents = (event) => {
      setMyContents(event.target.value)
   }

   return (
      <>
         <div>{data}</div>
         작성자: <input type="text" onChange={onChangeWriter}/><br/>
         제목: <input type="text" onChange={onChangeTitle}/><br/>
         내용: <input type="text" onChange={onChangeContents}/><br/>
         <button onClick={callGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
      </>
   )
}