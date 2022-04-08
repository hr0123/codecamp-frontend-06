import { Modal } from "antd";

export function checkValidationImage(file: File | undefined) {
  if (!file?.size) {
    Modal.error({ content: "파일이 없습니다." });
    return false;
  }
  return file;
}
