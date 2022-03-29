//09-03-boards 스타일즈 컴포넌트
import {ISubmitButtonProps} from "./BoardWrite.types"
import styled from '@emotion/styled'

export const SubmitButton = styled.button`
   background-color: ${(props:ISubmitButtonProps) => props.isActive ? "yellow" : "none"};
`
export const WriterInput = styled.input`
   border-color: green;
`