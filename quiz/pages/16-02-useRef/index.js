import { useEffect, useRef } from "react"

export default function UseRefPage(){
  const inputRef = useRef(null)

  // 해당 페이지에 접속하면 자동으로 비밀번호에 커서가 깜빡이도록
  useEffect(()=>{
    inputRef.current?.focus()
  },[])

  return(
    <input type="password" ref={inputRef}/>
  )
}