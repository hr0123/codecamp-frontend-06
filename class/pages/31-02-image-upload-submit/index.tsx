import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function ImageUploadPreviewPage() {
  const [file1, setFile1] = useState<File>();
  const [file2, setFile2] = useState<File>();
  const [file3, setFile3] = useState<File>();

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createBoard] = useMutation(CREATE_BOARD);

  const [imageUrl, setImageUrl] = useState("");

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    // input태그에서 선택한 파일들 중 첫번째(배열에 옵셔널체이닝_파일이 없을수도 있으니까)
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const fileReader = new FileReader();
    // 위의 변수file을 읽어서->임시 장문url형태로 만들어냄(인자blob=2진 형태의 큰 데이터)
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      // data.target?.result=다 읽어진 결과물(FileReader의 결과물)
      if (typeof data.target?.result === "string") {
        console.log(data.target?.result);
        setImageUrl(data.target?.result);
        setFile1(file);
      }
    };
  };

  const onClickSubmit = async () => {
    // (*순서 중요)이 onClick함수 안에서 파일 업로드(uploadFile_19-01)+게시글 등록(createBoard_units-09-03) 한꺼번에
    const result1 = await uploadFile({ variables: { file: file1 } }); //file1=아주 작은 이미지파일
    const imageUrl = result1.data.uploadFile.url; // id를 결과로 받아옴
    const result2 = await createBoard({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "안녕하세요~",
          contents: "이미지 업로드 입니다!!",
          images: [imageUrl],
        },
      },
    });
    console.log(result2.data.createBoard._id);
  };

  return (
    <div>
      {/* ↓파일 선택 */}
      <input type="file" onChange={onChangeFile} />
      {/* ↓미리보기 : 파일 선택시(onChangeFile함수) FileReader로 주소값(imageUrl) 생김 */}
      <img src={imageUrl} />
      {/* ↓게시글 등록 버튼 */}
      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </div>
  );
}
