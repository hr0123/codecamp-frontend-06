//QUIZ_상품_presenter컴포넌트
import {SignupButton} from "./ProductSignup.styles"

export default function ProductSignupUI(props){

   return(
      <>
         <h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
         판매자: <input type="text" onChange={props.onChangeSeller}/><br/>
         상품명: <input type="text" onChange={props.onChangeName}/><br/>
         상품설명: <input type="text" onChange={props.onChangeDetail}/><br/>
         상품가격: <input type="text" onChange={props.onChangePrice}/><br/>
         <SignupButton onClick={props.isEdit ? props.onClickEdit : props.onClickNew} isActive={props.isActive}>
            {props.isEdit ? "수정" : "등록"}하기
         </SignupButton>
      </> 
   )
}