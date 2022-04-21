import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../src/commons/store";

// 1.login 페이지에서 아이디, 비밀번호 입력창을 만들고 loginUser를 활용하여 accessToken을 받아보세요.
const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function QuizPaymentLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeId = (event) => {
    setId(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          password: password,
          email: id,
        },
      });
      const accessToken = result.data.loginUser.accessToken;
      // 2.받은 accessToken을 Context-API를 활용해 _app.tsx의 state에 저장
      setAccessToken(accessToken);
      console.log(accessToken);
      alert("로그인 성공");
      // 4-1.로그인에 성공하면 성공한 페이지로 이동
      router.push("/quiz06/payment/loading");
      // 4-2. accessToken이 없는 유저는 "로그인을 먼저 해주세요" 라는 경고문과 함께 login 페이지로 보내줍니다.
    } catch (error) {
      alert("로그인을 먼저 해주세요");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={onChangeId}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={onChangePassword}
      />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
