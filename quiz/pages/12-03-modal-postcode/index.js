import { Modal, Button } from "antd";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export default function ModalPostcodePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");

  const showModal = () => {
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleComplete = (data) => {
    console.log(data);
    setResult(data.address);
    setIsOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        모달열기
      </Button>
      <div>{result}</div>
      {isOpen && (
        <Modal
          title="주소 검색"
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
