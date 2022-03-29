//08-05-boards 스타일즈 컴포넌트
import styled from '@emotion/styled'
// export const SubmitButton = styled.button`
//    background-color: blue;
// `
export const SubmitButton = styled.button`
   background-color: ${(props) => props.isActive ? "yellow" : "none"};
`
export const WriterInput = styled.input`
   border-color: green;
`

