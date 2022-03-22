import {useState} from 'react'
import {useMutation} from '@apollo/client'
import BoardWriteUI from "./BoardWrite.presenter" //자동으로 안나오면 직접 입력
import {CREATE_BOARD} from './BoardWrite.queries' //자동으로 안나오면 직접 입력

export default function BoardWrite() {  
   const [isActive,setIsActive] = useState(false)

   const [data,setData] = useState("")
   const [myWriter,setMyWriter] = useState("")
   const [myTitle,setMyTitle] = useState("")
   const [myContents,setMyContents] = useState("")
      
   const [createBoard] = useMutation(CREATE_BOARD)

   const callGraphqlApi = async () => {  
      const result = await createBoard({ 
         variables: {writer: myWriter, title: myTitle, contents: myContents}
      })  
      console.log(result)   
      console.log(result.data.createBoard.message) 
      setData(result.data.createBoard.message)
   }

   const onChangeWriter = (event) => {  
      setMyWriter(event.target.value)
      if(event.target.value!=="" && myTitle!=="" && myContents!==""){
         setIsActive(true)
      } else {
         setIsActive(false)
      }
   }

   const onChangeTitle = (event) => {
      setMyTitle(event.target.value)
      if(myWriter!=="" && event.target.value!=="" && myContents!==""){
         setIsActive(true)
      } else {
         setIsActive(false)
      }
   }

   const onChangeContents = (event) => {
      setMyContents(event.target.value)
      if(myWriter!=="" && myTitle!=="" && event.target.value!==""){
         setIsActive(true)
      } else {
         setIsActive(false)
      }
   }

   return (
      <BoardWriteUI
         onChangeWriter={onChangeWriter}
         onChangeTitle={onChangeTitle}
         onChangeContents={onChangeContents}
         callGraphqlApi={callGraphqlApi}
         isActive={isActive}
      />
   )
}
