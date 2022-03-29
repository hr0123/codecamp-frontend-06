//09-03-boards 컨테이너 컴포넌트
import {IBoardWriteProps,IMyVariables} from "./BoardWrite.types"
import BoardWriteUI from "./BoardWrite.presenter"
import {CREATE_BOARD, UPDATE_BOARD} from './BoardWrite.queries'
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import {ChangeEvent, useState} from 'react'

export default function BoardWrite(props:IBoardWriteProps) {  
   const router = useRouter()
   const [isActive,setIsActive] = useState(false)
   const [data,setData] = useState("")
   const [myWriter,setMyWriter] = useState("")
   const [myTitle,setMyTitle] = useState("")
   const [myContents,setMyContents] = useState("")
   const [createBoard] = useMutation(CREATE_BOARD)
   const [updateBoard] = useMutation(UPDATE_BOARD)

   const onClickUpdate = async () => {   //수정->수정된 상세페이지 라우팅
      const myVariables:IMyVariables = {number:Number(router.query.mynumber)}
      if(myWriter!=="") myVariables.writer = myWriter  //states //if문 1줄->중괄호 생략or아랫줄에 중괄호 없이 들여쓰기
      if(myTitle!=="") myVariables.title = myTitle
      if(myContents!=="") myVariables.contents = myContents
      await updateBoard({variables:myVariables})
      alert("게시글 수정에 성공하였습니다!!!")
      router.push(`/09-01-boards/${router.query.mynumber}`)
   }

   const onClickSubmit = async () => {   //등록->상세페이지 라우팅
      const result = await createBoard({ 
         variables:{writer:myWriter, title:myTitle, contents:myContents}
      })  
      // console.log(result)   
      // console.log(result.data.createBoard.message) 
      // setData(result.data.createBoard.message)
      alert("게시글 등록에 성공하였습니다!!!")
      router.push(`/09-01-boards/${result.data.createBoard.number}`)  
   }

   const onChangeWriter = (event:ChangeEvent<HTMLInputElement>) => {  
      setMyWriter(event.target.value)
      if(event.target.value!=="" && myTitle!=="" && myContents!==""){
         setIsActive(true)
      } else {
         setIsActive(false)
      }
   }

   const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
      setMyTitle(event.target.value)
      if(myWriter!=="" && event.target.value!=="" && myContents!==""){
         setIsActive(true)
      } else {
         setIsActive(false)
      }
   }

   const onChangeContents = (event:ChangeEvent<HTMLInputElement>) => {
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
         onClickSubmit={onClickSubmit}
         onClickUpdate={onClickUpdate}
         isActive={isActive}
         isEdit={props.isEdit}
         data={props.data}  //props.data = 수정하기페이지로부터 옴
      />
   )
}
