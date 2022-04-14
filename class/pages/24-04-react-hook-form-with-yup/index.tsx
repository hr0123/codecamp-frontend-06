import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";

const Error = styled.div`
  color: red;
  font-size: 30px;
`;
const LoginButton = styled.button`
  background-color: ${(props) => (props.isActive ? "yellow" : "gray")};
  /* isActive 타입스크립트 만들기 : 불린으로 */
`;

const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일은 필수 입력사항입니다."),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상 입력해주세요.")
    .max(15, "비밀번호는 최대 15자리로 입력해주세요.")
    .required("비밀번호는 필수 입력사항입니다."),
});

interface IFormValues {
  email?: string;
  password?: string;
  // contents?: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema), //필드들의 검증 조건을 입력한 schema(yup)을 ReactHookForm과 합쳐줌
    mode: "onChange",
  });

  const onClickSubmit = (data: IFormValues) => {
    console.log(data);
  };

  // console.log("리렌더링 체크!!");

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      이메일: <input type="text" {...register("email")} />
      <Error>{formState.errors.email?.message}</Error>
      비밀번호: <input type="text" {...register("password")} />
      <Error>{formState.errors.password?.message}</Error>
      {/* 내용: <input type="text" {...register("contents")} /> */}
      {/* 내용: <input type="text" {...register("boardAddress.addressDetail")} /> */}
      <LoginButton isActive={formState.isValid}>로그인하기</LoginButton>
    </form>
  );
}
