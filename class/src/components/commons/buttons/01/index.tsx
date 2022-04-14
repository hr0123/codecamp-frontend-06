import styled from "@emotion/styled";

const Button = styled.button`
  background-color: ${(props) => (props.isActive ? "yellow" : "gray")};
  /* isActive 타입스크립트 만들기 : 불린으로 */
`;

export default function Button01(props) {
  return <Button isActive={props.isActive}>{props.title}</Button>;
}
