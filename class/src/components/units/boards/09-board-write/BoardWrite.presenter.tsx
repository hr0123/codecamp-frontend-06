//09-03-boards 프리젠터 컴포넌트
import {IBoardWriteUIProps} from "./BoardWrite.types"
import {SubmitButton,WriterInput} from './BoardWrite.styles'

export default function BoardWriteUI(props:IBoardWriteUIProps) { 
   
   return (
      <>
         {/* <div>{data}</div> */}
         <h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
         작성자: <WriterInput type="text" onChange={props.onChangeWriter} defaultValue={props.data?.fetchBoard.writer}/><br/>
         제목: <input type="text" onChange={props.onChangeTitle} defaultValue={props.data?.fetchBoard.title}/><br/>
         내용: <input type="text" onChange={props.onChangeContents} defaultValue={props.data?.fetchBoard.contents}/><br/>
         <SubmitButton onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit} isActive={props.isActive}>
            {props.isEdit ? "수정" : "등록"}하기
         </SubmitButton>
      </>
   )
}






