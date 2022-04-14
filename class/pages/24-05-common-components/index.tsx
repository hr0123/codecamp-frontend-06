// 24-04 복사해옴(컴포넌트 분리 위해)
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import Input01 from "../../src/components/commons/inputs/01";
import Button01 from "../../src/components/commons/buttons/01";

const Error = styled.div`
  color: red;
  font-size: 30px;
`;
// const LoginButton = styled.button`
//   background-color: ${(props) => (props.isActive ? "yellow" : "gray")};
//   /* isActive 타입스크립트 만들기 : 불린으로 */
// `;

// 아래schema는 컴포넌트 분리 시 validation.ts라는 파일로 보관하기
const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일은 필수 입력사항입니다."),
  password: yup
    .string()
    .required("비밀번호는 필수 입력사항입니다.")
    .min(4, "비밀번호는 최소 4자리 이상 입력해주세요.")
    .max(15, "비밀번호는 최대 15자리로 입력해주세요."),
});

interface IFormValues {
  email?: string;
  password?: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema), //필드들의 검증 조건을 입력한 schema(yup)을 ReactHookForm과 합쳐줌
    mode: "onChange",
  });

  const onClickSubmit = (data: IFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      {/* 이메일: <input type="text" {...register("email")} /> */}
      이메일: <Input01 type="text" register={register("email")} />
      <Error>{formState.errors.email?.message}</Error>
      {/* 비밀번호: <input type="text" {...register("password")} /> */}
      비밀번호: <Input01 type="password" register={register("password")} />
      <Error>{formState.errors.password?.message}</Error>
      {/* <LoginButton isActive={formState.isValid}>로그인하기</LoginButton> */}
      <Button01 isActive={formState.isValid} title="로그인하기" />
    </form>
  );
}
