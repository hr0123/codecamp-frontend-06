// 4. 위 3번의 과정을 하드코딩 하지 않고, 작성자, 제목, 내용에 대해서 <input /> 태그와 state를 각각 만들고,
//    직접 입력 받은 작성자, 제목, 내용으로 mutation을 요청해 주세요.
// 5. 위 6번에서 등록한 데이터를 console.log()로 출력해 보세요.
// 6. 위 6번에서 등록한 데이터를 playground에서 fetchBoard를 요청해서 정말 등록이 되었는지 확인해 보세요.

import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'

const CREATE_BOARD = gql`
   mutation createBoard($writer: String, $title: String, $contents: String) {
      createBoard(writer: $writer, title: $title, contents: $contents) {
         _id
         number
         message
      }
   }
`
export default function GraphqlBoardPage() {  
   const [createBoard] = useMutation(CREATE_BOARD)
   const [data,setData] = useState("")
   const [newWriter,setNewWriter] = useState("")
   const [newTitle,setNewTitle] = useState("")
   const [newContents,setNewContents] = useState("")      

   const onclickGqlApi = async () => {  
      const result = await createBoard({  
         variables: {writer: newWriter, title: newTitle, contents: newContents}
      })  
      console.log(result)
      console.log(result.data.createBoard.message)  
      setData(result.data.createBoard.message)
   }

   const onChangeWriter = (event) => {
      setNewWriter(event.target.value)
   }
   const onChangeTitle = (event) => {
      setNewTitle(event.target.value)
   }
   const onChangeContents = (event) => {
      setNewContents(event.target.value)
   }

   return (
      <>
         <div>{data}</div>
         작성자: <input type="text" onChange={onChangeWriter}/><br/>
         제목: <input type="text" onChange={onChangeTitle}/><br/>
         내용: <input type="text" onChange={onChangeContents}/><br/>
         <button onClick={onclickGqlApi}>GRAPHQL-API 요청하기</button>
      </>
   )
}