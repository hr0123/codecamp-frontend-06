import { Modal } from "antd";
import { useState } from "react";
import SignupUI from "./signup.presenter";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
  };

  const onClickSignup = () => {
    if (email === "" && name === "" && password === "") {
      Modal.error({ content: "내용을 입력해주세요" });
    }
    if (email === "" && name !== "" && password !== "") {
      Modal.error({ content: "이메일을 입력해주세요" });
    }
    if (email !== "" && name === "" && password !== "") {
      Modal.error({ content: "이름을 입력해주세요" });
    }
    if (email !== "" && name !== "" && password === "") {
      Modal.error({ content: "비밀번호를 입력해주세요" });
    }
    if (email !== "" && /^\w+@\w+\.\w+$/.test(email) === false) {
      Modal.error({ content: "이메일이 올바르지 않습니다" });
    }
    if (password !== passwordCheck) {
      Modal.error({ content: "비밀번호가 일치하지 않습니다" });
    }
  };

  return (
    <SignupUI
      onChangeEmail={onChangeEmail}
      onChangeName={onChangeName}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      onClickSignup={onClickSignup}
    />
  );
}
