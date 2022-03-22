import axios from 'axios'
import {useState} from 'react'

//웹에서 확인 위해 export default -> package.json 들어간 후 -> 터미널에 yarn dev
export default function RestGetPage() {  
   const [data,setData] = useState("")


   const callRestApi = async () => {  //화살표 함수
   
      const result = await axios.get("https://koreanjson.com/posts/1")
      console.log(result)
      console.log(result.data.title)  //result의 data 중 title
      setData(result.data.title)
   }

   return (
      <>
         <div>{data}</div>
         <button onClick={callRestApi}>REST-API 요청하기!!!</button>
      </>
   )
}