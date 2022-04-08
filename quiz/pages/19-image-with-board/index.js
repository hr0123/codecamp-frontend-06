import { useMutation, gql } from "@apollo/client";
import { Modal } from "antd";
import { useRef, useState } from "react";
import { LikeOutlined } from "@ant-design/icons";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

export default function ImageWithBoardPage() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [imgUrl, setImgUrl] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);
  const [data, setData] = useState("");

  const fileRef = useRef(null);
  console.log("11");
  const onChangeFile = async (event) => {
    const file = event.target.files?.[0];
    console.log(file);
    try {
      const result = await uploadFile({
        variables: { file },
      });
      console.log(data);
      setImgUrl(result.data?.uploadFile.url);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: writer,
          password: password,
          title: title,
          contents: contents,
          images: [imgUrl],
        },
      },
    });
    console.log(result);
    setData(result.data.createBoard.message);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onClickImgUpload = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div>{data}</div>
      작성자 : <input type="text" onChange={onChangeWriter} />
      <br />
      비밀번호 : <input type="text" onChange={onChangePassword} />
      <br />
      제목 : <input type="text" onChange={onChangeTitle} />
      <br />
      내용 : <input type="text" onChange={onChangeContents} />
      <br />
      <LikeOutlined onClick={onClickImgUpload} />
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
      />
      <img src={`https://storage.googleapis.com/${imgUrl}`} />
      <button onClick={onClickSubmit}>저장하기</button>
    </>
  );
}
