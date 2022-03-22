// import axios from 'axios'   //★rest-api 방식
import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'
import {useRouter} from 'next/router'

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
   const router = useRouter()
   
   const [myWriter,setMyWriter] = useState("")
   const [myTitle,setMyTitle] = useState("")
   const [myContents,setMyContents] = useState("")
   
   const [createBoard] = useMutation(CREATE_BOARD)

   const callGraphqlApi = async () => {  
      // const result = await axios.get("https://koreanjson.com/posts/1")   //★rest-api 방식
      try {
         const result = await createBoard({   //★graphql-api 방식
            variables: {writer: myWriter, title: myTitle, contents: myContents}
         })  
         console.log(result)  
         console.log(result.data.createBoard.message)  
         alert("게시글 등록 성공")
         alert("상세 페이지로 이동해 볼까요?")
         // router.push("/05-08-dynamic-routed-input/" + result.data.createBoard.number)
         router.push(`/05-08-dynamic-routed-input/${result.data.createBoard.number}`)
      } catch(error) {   //실패했을 때
         alert(error.message)
      }
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
         작성자: <input type="text" onChange={onChangeWriter}/><br/>
         제목: <input type="text" onChange={onChangeTitle}/><br/>
         내용: <input type="text" onChange={onChangeContents}/><br/>
         <button onClick={callGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
      </>
   )
}