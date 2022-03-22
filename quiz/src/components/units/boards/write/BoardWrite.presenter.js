import {BoardButton1,BoardButton2,BoardButton3} from './BoardWrite.styles'

export default function BoardWriteUI(props) {

   return (
      <div>
         <BoardButton1 onClick={props.onClickMove1} isActive1={props.isActive1}>83011번 게시글로 이동하기!!!</BoardButton1>
         <BoardButton2 onClick={props.onClickMove2} isActive2={props.isActive2}>83012번 게시글로 이동하기!!!</BoardButton2>
         <BoardButton3 onClick={props.onClickMove3} isActive3={props.isActive3}>83013번 게시글로 이동하기!!!</BoardButton3>
      </div>
   )
}



