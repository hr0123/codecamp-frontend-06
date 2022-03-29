//09-03 컴포넌트 타입스크립트 모음
import { ChangeEvent } from "react"

//컨테이너 타입
export interface IBoardWriteProps {
   isEdit:boolean   //index의 inEdit(false,true)으로 데이터타입 지정
   data?:any   //data없는 index도 있으므로 물음표
}
export interface IMyVariables {
   number:number
   writer?:string
   title?:string
   contents?:string
}

//프리젠터 타입
export interface IBoardWriteUIProps {
   onChangeWriter:(event:ChangeEvent<HTMLInputElement>)=>void
   onChangeTitle:(event:ChangeEvent<HTMLInputElement>)=>void
   onChangeContents:(event:ChangeEvent<HTMLInputElement>)=>void
   onClickSubmit:()=>void
   onClickUpdate:()=>void
   isActive:boolean
   isEdit:boolean
   data?:any
}

//스타일 타입
export interface ISubmitButtonProps {
   isActive:boolean
}
