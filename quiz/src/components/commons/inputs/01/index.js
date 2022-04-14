import styled from "@emotion/styled";

const Input = styled.input`
  font-size: 30px;
  font-weight: bold;
  color: white;
  background-color: pink;
`;

export default function Input01(props) {
  return <Input type={props.type} {...props.register} />;
}
