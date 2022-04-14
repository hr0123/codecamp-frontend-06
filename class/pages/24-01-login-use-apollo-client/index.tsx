// 23-04 복사해옴
import { useMutation, gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, userInfoState } from "../../src/commons/store/index";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;
const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserInfo] = useRecoilState(userInfoState);

  const client = useApolloClient();

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

    // 2.유저 정보 받아오기(client=axios라고 생각하면됨)
    const resultUserInfo = await client.query({
      query: FETCH_USER_LOGGED_IN,
      context: {
        // 특정api를 보낼때 추가할 옵션 설정
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
    const userInfo = resultUserInfo.data.fetchUserLoggedIn; //email, name
    console.log(userInfo);

    // 3.loginUser로 받아온 토큰(1)과, fetchUserLoggedIn로받아온 유저정보(2)를->글로벌스테이트에 저장
    setAccessToken(accessToken);
    setUserInfo(userInfo);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    //객체는 로컬,세션스토리지에 저장 불가->객체를 문자열로 바꿔야 저장 가능

    // 4.로그인성공 페이지로 이동
    alert("로그인에 성공하였습니다!");
    router.push("/24-02-login-use-apollo-client-success");
  };

  return (
    // <form onSubmit={}>
    <div>
      이메일: <input type="text" onChange={onChangeEmail} />
      <br />
      비밀번호: <input type="password" onChange={onChangePassword} />
      <br />
      <button onClick={onClickLogin}>로그인하기</button>
      {/* <button type="submit">등록하기</button>
      <button type="button" onClick={}>나만의 버튼</button>
      <button type="reset">초기화하기</button> */}
    </div>
    // </form>
  );
}
