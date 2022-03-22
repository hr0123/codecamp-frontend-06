import {useQuery,gql} from '@apollo/client'
import styled from '@emotion/styled'  //한el map을 한행으로 만들기(flex)

const FETCH_BOARDS = gql`
   query fetchBoards{
      fetchBoards{
         number
         writer
         title
         contents
      }
   }
`
const MyRow = styled.div`
   display:flex;
   flex-direction:row;

`
const MyColumn = styled.div`
   width:25%;  //전체 가로의 1/4
`

export default function MapBoardPage() {
   const {data} = useQuery(FETCH_BOARDS)

   return (
      <>
         {data?.fetchBoards.map((el)=>(   //el=data?.fetchBoards(el개수만큼 map이 반복실행됨)
            <MyRow key={el.number}>  
               <MyColumn><input type="checkbox"/></MyColumn>
               <MyColumn>{el.number}</MyColumn>
               <MyColumn>{el.writer}</MyColumn>
               <MyColumn>{el.title}</MyColumn>
            </MyRow>
         ))}

         {/* title 대신 index -> map문 소괄호 안에 index 추가 
         {data?.fetchBoards.map((el, index)=>( 
            <MyRow key={el.number}>  
               <MyColumn><input type="checkbox"/></MyColumn>
               <MyColumn>{el.number}</MyColumn>
               <MyColumn>{el.writer}</MyColumn>
               <MyColumn>{index}</MyColumn>
            </MyRow>
         ))} */}

      </>
   )
}