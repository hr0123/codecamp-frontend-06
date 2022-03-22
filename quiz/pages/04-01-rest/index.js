// [ REST-API 요청하기 ] 라는 버튼을 만들고, 이 버튼을 클릭했을 때
// https://koreanjson.com/users 라는 Endpoint에
// get 방식으로 요청하여 데이터를 받아보세요.

import axios from 'axios'
import {useState} from 'react'

export default function RestGetPage() {  
   const [content,setContent] = useState("ss")

   const onClickRestApi = async () => {  
      const result = await axios.get("https://koreanjson.com/users")
      console.log(result)   //콘솔에 result 띄우기 : 하위항목명 확인 위함
      console.log(result.data[0].name)   //콘솔에 띄우기 : result의👉data 중👉index 0번째의👉name
      setContent(result.data[0].name)   //★해결★ result의👉data 중👉index 0번째의👉name
   }

   return (
      <>
         <div>{content}</div>
         <button onClick={onClickRestApi}>REST-API 요청하기</button>
      </>
   )
}