import {useEffect, useState} from "react"
import { useRouter } from "next/router";

export default function UseEffectPage(){
  const [isChange,setIsChange] = useState(false)
  const router = useRouter()

  // (DidMount)컴포넌트가 렌더링이 되고난 이후, 경고메시지
  useEffect(()=>{
    alert("Rendered!")
  },[])

  const onClickEdit = () => {
    setIsChange(prev=>!prev)
  }
  // (DidUpdate)변경 버튼을 클릭하면, 경고메시지
  useEffect(()=>{
    alert("Changed!!")
  },[isChange])
  
  const onClickMove = () => {
    router.push("/")
  }
  // (WillUnmount)이동 버튼을 클릭하면, 경고메시지
  useEffect(()=>{
    return () => {
      alert("Bye!!")
    }
  },[])
  
  return(
    <>
      <button onClick={onClickEdit}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </>
  )
}