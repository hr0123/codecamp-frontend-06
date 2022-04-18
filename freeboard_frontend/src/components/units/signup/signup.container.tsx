import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import SignupUI from "./signup.presenter";
import { CREATE_USER } from "./signup.queries";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

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

  const onClickSignup = async () => {
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
    await createUser({
      variables: {
        createUserInput: {
          email,
          password,
          name,
        },
      },
    });
    router.push("/login");
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
