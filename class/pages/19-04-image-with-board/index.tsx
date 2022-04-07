// (04-05복사해옴)게시물등록 & (19-03)사진업로드 합치기
import { ChangeEvent, useRef, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { checkFileValidation } from "../../src/commons/libraries/validation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;
// uploadFile이라는 api(be06 Playground)
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function GraphqlMutationPage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  // (문자열 타입으로)있을 수도 있고, 아예 없을 수도 있고 다 가능하도록 설정

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [data, setData] = useState("");

  const [myWriter, setMyWriter] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [myContents, setMyContents] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);

  const callGraphqlApi = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: myWriter,
          password: myPassword,
          title: myTitle,
          contents: myContents,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
    console.log(result.data.createBoard.message);
    setData(result.data.createBoard.message);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setMyWriter(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(event.target.value);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setMyTitle(event.target.value);
  };
  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setMyContents(event.target.value);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files && event.target.files[0];
    // 파일 여러개 선택 가능해서 files
    // 선택한 파일이 있다면->index0파일을 변수에 담음 -> 옵셔널체이닝👇
    const myfile = event.target.files?.[0];
    console.log(myfile);

    const isValid = checkFileValidation(myfile);
    if (!isValid) return;
    //checkFileValidation함수 결과가 false면 사진업로드 안되게함

    try {
      const result = await uploadFile({
        variables: { file: myfile },
        // myfile말고 똑같이file로 하면->variables: {file}
      });
      //result안에 사진주소(url)이 담겨오는거 받기
      console.log(result.data?.uploadFile.url);
      setImageUrl(result.data?.uploadFile.url);
    } catch (error) {
      Modal.error({ content: error.message });
      // alert("")
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div>{data}</div>
      작성자: <input type="text" onChange={onChangeWriter} />
      <br />
      비밀번호: <input type="text" onChange={onChangePassword} />
      <br />
      제목: <input type="text" onChange={onChangeTitle} />
      <br />
      내용: <input type="text" onChange={onChangeContents} />
      <br />
      <div>
        <div>이미지 업로드 연습하기</div>
        <div
          style={{ width: "150px", height: "150px", backgroundColor: "gray" }}
          onClick={onClickImage}
        >
          이미지 선택
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          onChange={onChangeFile}
          ref={fileRef}
        />
        <img src={`https://storage.googleapis.com/${imageUrl}`} />
      </div>
      <button onClick={callGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </>
  );
}
