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
// const Button = styled.button`
//   background-color: ${(props) => (props.isActive ? "pink" : "gray")};
// `;

const schema = yup.object({
  writer: yup
    .string()
    .required("이메일은 필수 입력사항입니다.")
    .max(5, "작성자 이름은 5글자까지 설정 가능합니다."),
  password: yup
    .string()
    .required("비밀번호는 필수 입력사항입니다.")
    .max(8, "비밀번호는 8자리까지 설정 가능합니다.")
    .matches(/[a-zA-Z]/, "비밀번호는 영문을 포함해야합니다.")
    .matches(/[0-9]/, "비밀번호는 숫자를 포함해야합니다.")
    .matches(/[@$!%*#?&]/, "비밀번호는 특수문자를 포함해야합니다."),
  title: yup
    .string()
    .required("제목은 필수 입력사항입니다.")
    .max(100, "제목은 100자 이내로 작성 가능합니다."),
  contents: yup
    .string()
    .required("내용은 필수 입력사항입니다.")
    .max(1000, "내용은 1000자 이내로 작성 가능합니다."),
});

export default function ReactHookFormYupPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickPost = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onClickPost)}>
      {/* 작성자: <input type="text" {...register("writer")} /> */}
      작성자: <Input01 type="text" register={register("writer")} />
      <Error>{formState.errors.writer?.message}</Error>
      {/* 비밀번호: <input type="password" {...register("password")} /> */}
      비밀번호: <Input01 type="password" register={register("password")} />
      <Error>{formState.errors.password?.message}</Error>
      {/* 제목: <input type="text" {...register("title")} /> */}
      제목: <Input01 type="text" register={register("title")} />
      <Error>{formState.errors.title?.message}</Error>
      {/* 내용: <input type="text" {...register("contents")} /> */}
      내용: <Input01 type="text" register={register("contents")} />
      <Error>{formState.errors.contents?.message}</Error>
      {/* <Button isActive={formState.isValid}>게시물 등록하기</Button> */}
      <Button01 isActive={formState.isValid} title={"게시물 등록하기"} />
    </form>
  );
}
