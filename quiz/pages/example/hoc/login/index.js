import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../src/commons/store";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function QuizLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeId = (event) => {
    setId(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onClickLogin = async () => {
    const result = await loginUser({
      variables: {
        // email:email,
        // password:password
        email: id,
        password,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);
    alert("로그인에 성공하였습니다!");
    router.push("/example/hoc/main");
  };

  return (
    <>
      <input
        type="text"
        placeholder="아이디를 입력해주세요"
        onChange={onChangeId}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangePassword}
      />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
