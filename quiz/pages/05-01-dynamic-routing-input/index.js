//✔판매자, 상품명, 상품내용, 상품가격을 입력할 수 있는 상품 등록 화면
//✔상품 등록 버튼을 누르면 createProduct를 활용하여 상품등록 mutation을 요청해 주세요.
//✔mutation이 실패할 수도 있기 때문에, try ~ catch로 감싸 주세요.(예외처리)
//✔상세보기 화면으로 동적 라우팅하여 이동해 주세요(응답으로 받은 상품ID 활용)

import {useRouter} from 'next/router'
import {useMutation, gql} from '@apollo/client'
import {useState} from 'react'

const CREATE_PRODUCT = gql`
   mutation createProduct($seller:String, $createProductInput:CreateProductInput!) {
      createProduct(seller:$seller, createProductInput:$createProductInput) {
         _id
         number
         message
      }
   }
`

export default function DynamicRoutingPage() {
   const [createProduct] = useMutation(CREATE_PRODUCT);
   const router = useRouter();
   const [seller,setSeller] = useState("");
   const [name,setName] = useState("");
   const [detail,setDetail] = useState("");
   const [price,setPrice] = useState("")
   
   const onClickRegister = async () => {
      try {
         const result = await createProduct({
            variables:{
               seller:seller,
               createProductInput:{name:name, detail:detail, price:parseInt(price)}
            }
         })
         console.log(result)
         console.log(result.data.createProduct._id)
         alert("상품 등록 성공")
         alert("상세 페이지로 이동해 볼까요?")
         router.push(`/quiz/05-02-dynamic-routed-input/${result.data.createProduct._id}`)
      } catch(error) {
         alert(error.message)
      }
   } 

   const onChangeSeller = (event) => {
      setSeller(event.target.value)
   }
   const onChangeProduct = (event) => {
      setName(event.target.value)
   }
   const onChangeDetails = (event) => {
      setDetail(event.target.value)
   }
   const onChangePrice = (event) => {
      setPrice(event.target.value)
   }

   return (
      <>
         판매자: <input type="text" onChange={onChangeSeller}/><br/>
         상품명: <input type="text" onChange={onChangeProduct}/><br/>
         상품내용: <input type="text" onChange={onChangeDetails}/><br/>
         상품가격: <input type="text" onChange={onChangePrice}/><br/>
         <button onClick={onClickRegister}>상품 등록</button>
      </>
   )
}