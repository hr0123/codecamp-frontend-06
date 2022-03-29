import {useQuery,useMutation,gql} from '@apollo/client'
import styled from '@emotion/styled'

const FETCH_PRODUCTS = gql`
   query fetchProducts{
      fetchProducts{
         _id
         seller
         name
         detail
         price
      }
   }
`
const DELETE_PRODUCT = gql`
   mutation deleteProduct($productId:ID){
      deleteProduct(productId:$productId){
         message
      }
   }
`
const Row = styled.div`
   display:flex;
   flex-direction:row;
`
const Column = styled.div`
   width:20%
`

export default function MapProductsPage(){
   const {data} = useQuery(FETCH_PRODUCTS)
   const [deleteProduct] = useMutation(DELETE_PRODUCT)
   const onClickDelete = (event) => {
      deleteProduct({
         variables:{productId:event.target.id},
         refetchQueries:[{query:FETCH_PRODUCTS}]
      })
   }
   //👆이 함수가 실행되면(버튼 누르면)
   //deleteProduct라는 객체의
   //첫번째KEY variables의 VALUE로 객체{productId:event.target.id}가 들어가서
   //👉productId에, 누른 버튼의 el._id(=id)가 할당되어 -> 해당el._id의 데이터가 삭제되고
   //두번째KEY refetchQueries의 VALUE로 [{query:FETCH_PRODUCTS}](배열아니고 그냥 할당)가 들어가서
   //👉query가 refetch되고(조회 데이터 업데이트됨) 그 query명은 FETCH_PRODUCTS이다.라는 의미!


   return (
      <>
         {data?.fetchProducts.map((el)=>(
            <Row key={el._id}>
               <Column><input type="checkbox"/></Column>
               <Column>{el.seller}</Column>
               <Column>{el.name}</Column>
               <Column>{el.detail}</Column>
               <Column>{el.price}</Column>
               <Column><button id={el._id} onClick={onClickDelete}>삭제</button></Column>
            </Row>
         ))}
         
      </>
   )
}