//QUIZ_상품_상세 페이지
import {useQuery,gql} from '@apollo/client'
import { useRouter } from 'next/router'

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
export default function ProductDetailPage(){
   const router = useRouter()
   const {data} = useQuery(FETCH_PRODUCT,{   //동일productId의 등록or수정한 내용 조회
      variables:{productId:router.query.productId}
   })
   console.log(data)
   const onClickMove = () => {   //동일productId의 수정페이지로 라우팅
      router.push(`/08-products/${router.query.productId}/edit`)
   }
   return(
      <>
         <div>상품ID: {data?.fetchProduct._id}</div>
         <div>판매자: {data?.fetchProduct.seller}</div>
         <div>상품명: {data?.fetchProduct.name}</div>
         <div>상품상세: {data?.fetchProduct.detail}</div>
         <div>상품가격: {data?.fetchProduct.price}</div>
         <button onClick={onClickMove}>수정하러 이동</button>
      </>
   )
}