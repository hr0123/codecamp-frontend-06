import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store/index";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onClickLogin = async () => {
    // 1.로그인 하기
    const result = await loginUser({
      variables: {
        // email:email,
        // password:password
        email,
        password,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);
    // 2.유저 정보 받아오기

    // 3.loginUser로 받아온 토큰(1)과, 받아온 유저정보(2)를->글로벌스테이트에 저장
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    // 4.로그인성공 페이지로 이동
    alert("로그인에 성공하였습니다!");
    router.push("/23-05-login-check-success");
  };

  return (
    <div>
      이메일: <input type="text" onChange={onChangeEmail} />
      <br />
      비밀번호: <input type="password" onChange={onChangePassword} />
      <br />
      <button onClick={onClickLogin}>로그인하기</button>
    </div>
  );
}
