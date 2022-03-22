import styled from '@emotion/styled'

export const BoardButton1 = styled.button`
   background-color : ${(props)=>props.isActive1 ? "pink" : "none"}
`
export const BoardButton2 = styled.button`
   background-color : ${(props)=>props.isActive2 ? "red" : "none"}
`
export const BoardButton3 = styled.button`
   background-color : ${(props)=>props.isActive3 ? "blue" : "none"}
`