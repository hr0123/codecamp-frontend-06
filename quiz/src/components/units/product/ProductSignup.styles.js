//QUIZ_상품_styles컴포넌트
import styled from '@emotion/styled'

export const SignupButton = styled.button`
   background-color:${(props)=>props.isActive ? "yellow" : "none"};
`