import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import LoginUI from "./login.presenter";
import { LOGIN_USER } from "./login.queries";
import { accessTokenState } from "../../../commons/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

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
    const result = await loginUser({
      variables: {
        password: password,
        email: email,
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    setAccessToken(accessToken);
    console.log(accessToken);
    Modal.success({ content: "로그인에 성공하였습니다" });
    router.push("/boards");
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
