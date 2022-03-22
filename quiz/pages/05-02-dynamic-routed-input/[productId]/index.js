//✔동적라우팅된 화면에서 주소에 있는 상품ID를 가져오고(router.query 활용), 가져온 상품ID로 fetchProduct를 활용하여 상품 정보를 조회
//✔조회한 상품 정보를 화면에 보여주세요.
//✔조건부 렌더링의 **&& 연산자**를 사용해 보세요.
//✔&&연산자를 **옵셔널 체이닝**을 사용해서 변경해 보세요.
//✔data가 없을 때, 초기 상태를 loading... 으로 표기(삼항 연산자)

import {useQuery,gql} from "@apollo/client"
import {useRouter} from "next/router"

const FETCH_PRODUCT = gql`
   query fetchProduct($productId:ID){
      fetchProduct(productId:$productId){
         _id
         seller
         name
         detail
         price
      }
   }
`

export default function DynamicRoutedPage() {
   const router = useRouter()
   console.log(router)

   const {data} = useQuery (FETCH_PRODUCT, {
      variables: {productId: router.query.productId}
   })   
   console.log(data)

   return (
         // 1. 조건부 렌더링의 && 연산자
         // <div>판매자: {data && data.fetchProduct.seller}</div>
         // <div>상품명: {data && data.fetchProduct.name}</div>
         // <div>상품내용: {data && data.fetchProduct.detail}</div>
         // <div>상품가격: {data && data.fetchProduct.price}</div>
         // 2. 옵셔널 체이닝으로 변경
         // <div>상품ID: {data?.fetchProduct._id}</div>
         // <div>판매자: {data?.fetchProduct.seller}</div>
         // <div>상품명: {data?.fetchProduct.name}</div>
         // <div>상품내용: {data?.fetchProduct.detail}</div>
         // <div>상품가격: {data?.fetchProduct.price}</div>
         <>
         {/* 3. data가 없을 때, 초기 상태를 loading... 으로 표기(삼항 연산자) */}
         <div>상품ID: {data ? data.fetchProduct._id : "loading..."}</div>
         <div>판매자: {data ? data.fetchProduct.seller : "loading..."}</div>
         <div>상품명: {data ? data.fetchProduct.name : "loading..."}</div>
         <div>상품내용: {data ? data.fetchProduct.detail : "loading..."}</div>
         <div>상품가격: {data ? data.fetchProduct.price : "loading..."}</div>
      </>
   )
}