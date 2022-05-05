import { useApolloClient, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import LoginUI from "./login.presenter";
import { LOGIN_USER, FETCH_USER_LOGGED_IN } from "./login.queries";
import { accessTokenState, userInfoState } from "../../../commons/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const client = useApolloClient();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    if (email === "") {
      Modal.error({ content: "이메일을 입력해주세요" });
    }
    if (password === "") {
      Modal.error({ content: "비밀번호를 입력해주세요" });
    }
    if (/^\w+@\w+\.\w+$/.test(email) === false) {
      Modal.error({ content: "이메일이 올바르지 않습니다" });
    }
    // 1.로그인 하기
    const result = await loginUser({
      variables: {
        password: password,
        email: email,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);
    // 2.유저 정보 받아오기(client=axios라고 생각하면됨)
    const resultUserInfo = await client.query({
      query: FETCH_USER_LOGGED_IN,
      context: {
        //특정api를 보낼때 추가할 옵션 설정하는 것
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
    const userInfo = resultUserInfo.data.fetchUserLoggedIn;
    console.log(userInfo);
    // 3.loginUser로 받아온 토큰(1)과, fetchUserLoggedIn로받아온 유저정보(2)를->글로벌스테이트에 저장
    setAccessToken(accessToken);
    setUserInfo(userInfo);
    // localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    //↑객체는 로컬,세션스토리지에 저장 불가->객체를 문자열로 바꿔야 저장 가능
    // 4.로그인성공 페이지로 이동
    Modal.success({ content: "로그인에 성공하였습니다" });
    router.push("/mypage");
  };

  const onClickMovetoSignup = () => {
    router.push("/signup");
  };

  return (
    <LoginUI
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onClickLogin={onClickLogin}
      onClickMovetoSignup={onClickMovetoSignup}
    />
  );
}
