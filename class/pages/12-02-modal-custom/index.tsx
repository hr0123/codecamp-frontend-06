// import React, { useState } from "react";  -> nextJS 사용중에는 import React 표기안해도됨
import { useState } from "react";
import { Modal, Button } from "antd";

// 6번줄 변경전 : const App = () => {
export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const showModal = () => {
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal" // 커스텀가능
        visible={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        비밀번호 입력: <input type="password" onChange={onChangePassword} />
      </Modal>
    </>
  );
}
