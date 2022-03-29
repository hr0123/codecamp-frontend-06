import { useState } from "react";
import { Modal, Button } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);

  // const showModal = () => {
  //   setIsOpen((prev) => !prev); // 토글: 열려있으면 닫고, 닫혀있으면 열기  *false(창닫힘)-><-true(창열림)
  // };
  // const handleOk = () => {
  //   setIsOpen((prev) => !prev); // 토글: 열려있으면 닫고, 닫혀있으면 열기  *false(창닫힘)-><-true(창열림)
  // };
  // const handleCancel = () => {
  //   setIsOpen((prev) => !prev); // 토글: 열려있으면 닫고, 닫혀있으면 열기  *false(창닫힘)-><-true(창열림)
  // };
  // const handleComplete = (data) => {
  //   console.log(data);
  //   setIsOpen((prev) => !prev); // 토글: 열려있으면 닫고, 닫혀있으면 열기  *false(창닫힘)-><-true(창열림)
  // };
  const onToggleModal = () => {
    setIsOpen((prev) => !prev); // 토글: 열려있으면 닫고, 닫혀있으면 열기  *false(창닫힘)-><-true(창열림)
  };
  const handleComplete = (data: any) => {
    console.log(data);
    onToggleModal(); // 토글: 열려있으면 닫고, 닫혀있으면 열기  *false(창닫힘)-><-true(창열림)
  };

  return (
    <>
      <Button onClick={onToggleModal}>Open Modal</Button>
      {isOpen && (
        <Modal visible={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
