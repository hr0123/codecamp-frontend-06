import styled from "@emotion/styled";

const Wrapper = styled.div`
  /* 기본CSS */
  /* width: 1000px; */
  width: 62.5rem; // 단위: rem, em, px
  height: 1000px;
  background-color: red;

  @media (min-width: 768px) and (max-width: 991px) {
    /* 추가조건1. pc */
    width: 500px;
    height: 500px;
    background-color: green;
  }
  @media (max-width: 767px) {
    /* 추가조건2. 모바일 */
    width: 100px;
    height: 100px;
    background-color: blue;
    /* display: none; */
  }
`;

export default function ResponsiveDesignPage() {
  return <Wrapper>상자</Wrapper>;
}
