import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginUI from "./login.presenter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = () => {
    if (email === "") {
      Modal.error({ content: "이메일을 입력해주세요" });
    }
    if (password === "") {
      Modal.error({ content: "비밀번호를 입력해주세요" });
    }
    if (/^\w+@\w+\.\w+$/.test(email) === false) {
      Modal.error({ content: "이메일이 올바르지 않습니다" });
    }
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
