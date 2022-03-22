import BoardWriteUI from './BoardWrite.presenter'
import {CREATE_BOARD} from './BoardWrite.queries'

import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import {useState} from 'react'

export default function BoardWrite() {
   const [createBoard] = useMutation(CREATE_BOARD);
   const router = useRouter();
   const [name,setName] = useState("");
   const [password,setPassword] = useState("");
   const [title,setTitle] = useState("");
   const [content,setContent] = useState("")
   const onClickPost = async () => {
      if(name==="" || password==="" || title==="" || content==="") {
         alert("내용을 모두 입력해주세요.")
      } else {  //상세페이지로 라우팅
         try {
            const result = await createBoard({ 
            variables:{createBoardInput:{writer:name, password:password, title:title, contents:content}}
            })
            console.log(result)
            console.log(result.data.createBoard._id)
            alert("게시물 등록 성공")
            router.push(`/boards/${result.data.createBoard._id}`)
         } catch(error) {
            alert(error.message)
         }
      }
   }
   const onChangeName = (event) => {
   setName(event.target.value)
   }
   const onChangePassword = (event) => {
   setPassword(event.target.value)
   }
   const onChangeTitle = (event) => {
   setTitle(event.target.value)
   }
   const onChangeContent = (event) => {
   setContent(event.target.value)
   }

   return (
      <BoardWriteUI
         onClickPost={onClickPost}
         onChangeName={onChangeName}
         onChangePassword={onChangePassword}
         onChangeTitle={onChangeTitle}
         onChangeContent={onChangeContent}
      />
   )
 }
 


