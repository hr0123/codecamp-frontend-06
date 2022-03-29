// import axios from 'axios'
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'
import {IMutation, IMutationCreateBoardArgs} from "../../src/commons/types/generated/types"

const CREATE_BOARD = gql`
   mutation createBoard($writer: String, $title: String, $contents: String) {
      createBoard(writer: $writer, title: $title, contents: $contents) {
         _id
         number
         message
      }
   }
`
export default function GraphqlMutationPage() {  
   const [myWriter,setMyWriter] = useState("")
   const [myTitle,setMyTitle] = useState("")
   const [myContents,setMyContents] = useState("")
   
   const [data,setData] = useState("")
   const [createBoard] = useMutation<Pick<IMutation,'createBoard'>,IMutationCreateBoardArgs>(CREATE_BOARD)

   const callGraphqlApi = async () => {  //화살표 함수 형식
      // const result = await axios.get("https://koreanjson.com/posts/1")  //★rest-api 방식
      const result = await createBoard({  //★graphql-api 방식
         variables: {writer: myWriter, title: myTitle, contents: myContents}
      })  
      console.log(result)   
      console.log(result.data?.createBoard?.message) 
      setData(result.data?.createBoard?.message || "")
      // if(result.data?.createBoard?.message) setData(result.data?.createBoard?.message)  //있으면 setData함
   }

   const onChangeWriter = (event) => {  
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