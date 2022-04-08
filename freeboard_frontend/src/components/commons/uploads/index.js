import { useMutation, gql } from "@apollo/client";
import { useRef } from "react";
import { Modal } from "antd";
import styled from "@emotion/styled";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const UploadImage = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 24px;
  cursor: pointer;
`;

const UploadButton = styled.button`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const UploadFileHidden = styled.input`
  display: none;
`;

export default function ImageUploadPage(props) {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  // const [imgUrl, setImgUrl] = useState("");
  const fileRef = useRef(null);

  const onChangeFile = async (event) => {
    const file = event.target.files?.[0] || undefined;
    try {
      const result = await uploadFile({
        variables: { file },
      });
      props.onChangeFileUrls(result.data.uploadFile.url, props.index);
      // console.log(data);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  const onClickImgUpload = () => {
    fileRef.current?.click();
  };

  return (
    <>
      {props.fileUrl ? (
        <UploadImage
          onClick={onClickImgUpload}
          src={`https://storage.googleapis.com/${props.fileUrl}`}
        />
      ) : (
        <UploadButton onClick={onClickImgUpload}>
          <>+</>
          <>Upload</>
        </UploadButton>
      )}
      <UploadFileHidden
        // style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
      />
    </>
  );
}
