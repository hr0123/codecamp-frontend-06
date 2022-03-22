// 4. 위 3번의 과정을 하드코딩 하지 않고, 작성자, 제목, 내용에 대해서 <input /> 태그와 state를 각각 만들고,
//    직접 입력 받은 작성자, 제목, 내용으로 mutation을 요청해 주세요.
// 5. 위 6번에서 등록한 데이터를 console.log()로 출력해 보세요.
// 6. 위 6번에서 등록한 데이터를 playground에서 fetchBoard를 요청해서 정말 등록이 되었는지 확인해 보세요.
// 7. 위 6~7번에 대한 과정을 createProduct에 대해서 동일하게 진행해 보세요.

import {useState} from 'react'
import {useMutation, gql} from '@apollo/client'

const CREATE_PRODUCT = gql`
mutation createProduct($seller: String, $createProductInput: CreateProductInput!){
      createProduct(seller: $seller, createProductInput: $createProductInput){
         _id
         number
         message
      }
   }
`
export default function GraphqlCreateProduct(){

   const [createProduct] = useMutation(CREATE_PRODUCT)
   const [newSeller,setNewSeller] = useState("")
   const [newProduct,setNewProduct] = useState("")
   const [newProductDetails,setNewProductDetails] = useState("")
   const [newPrice,setNewPrice] = useState("")      
   const [data,setData] = useState("")

   const onClickSignUp = async () => {  
      const result = await createProduct({  
         variables: {
            seller: newSeller, 
            createProductInput: {name: newProduct, detail: newProductDetails, price: parseInt(newPrice)} //★해결★ price를 문자열로 선언했으므로, parseInt()해서 숫자로 타입바꾸기(Number()는 중간 문자 못 거름) 
         }
      })  
      console.log(result)
      console.log(result.data.createProduct._id)  
      setData(result.data.createProduct.message)
   }

   const onChangeSeller = (event) => {
      setNewSeller(event.target.value)
   }
   const onChangeProduct = (event) => {
      setNewProduct(event.target.value)
   }
   const onChangeProductDetails = (event) => {
      setNewProductDetails(event.target.value)
   }
   const onChangePrice = (event) => {
      setNewPrice(event.target.value)
   }

   return (
      <>
         <div>{data}</div>
         판매자: <input type="text" onChange={onChangeSeller}/><br />
         상품명: <input type="text" onChange={onChangeProduct}/><br />
         상품상세: <input type="text" onChange={onChangeProductDetails}/><br />
         상품가격: <input type="text" onChange={onChangePrice}/><br />
         <button onClick={onClickSignUp}>상품 등록하기</button>
      </>
   )
}