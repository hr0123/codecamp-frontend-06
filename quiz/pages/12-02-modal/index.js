import { Modal, Button } from "antd";
import { useState } from "react";

export default function OpenModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        모달열기
      </Button>
      <Modal
        title="게시글 등록"
        visible={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        게시글이 등록되었습니다.
      </Modal>
    </>
  );
}
