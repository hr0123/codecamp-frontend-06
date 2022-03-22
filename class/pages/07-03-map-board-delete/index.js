import {useQuery,useMutation,gql} from '@apollo/client'
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
const DELETE_BOARD = gql`
   mutation deleteBoard($number:Int){
      deleteBoard(number:$number){
         message
      }
   }
`
const Row = styled.div`
   display:flex;
   flex-direction:row;

`
const Column = styled.div`
   width:20%;  
`

export default function MapBoardPage() {
   const {data} = useQuery(FETCH_BOARDS)
   const [deleteBoard] = useMutation(DELETE_BOARD)
   const onClickDelete = (event) => {   //이벤트핸들러함수(이벤트가 들어왔을때 함수랑 연결해주는 것)
      deleteBoard({
         variables:{number:Number(event.target.id)},
         refetchQueries:[{query:FETCH_BOARDS}]
      })
   }

   return (
      <>
         {data?.fetchBoards.map((el)=>(
            //⭐map에서 key를 줄때는 index로 주면 안되고 고유한 데이터카테고리 넣기
            //⭐<Fragment key={el.number}></Fragment>  VS  <></>에는 key넣을수없음  
            <Row key={el.number}>
               <Column><input type="checkbox"/></Column>
               <Column>{el.number}</Column>
               <Column>{el.writer}</Column>
               <Column>{el.title}</Column>
               <Column><button id={el.number} onClick={onClickDelete}>삭제</button></Column>
            </Row>
         ))}
      </>
   )
}