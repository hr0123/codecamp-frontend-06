// 19-01복사해왔음
import { ChangeEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";
import { Modal } from "antd";
import { checkFileValidation } from "../../src/commons/libraries/validation";

// uploadFile이라는 api(be06 Playground)
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageValidationPage() {
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  // (문자열 타입으로)있을 수도 있고, 아예 없을 수도 있고 다 가능하도록 설정

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

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

  return (
    <div>
      <div>이미지 업로드 연습하기</div>
      <input type="file" onChange={onChangeFile} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </div>
  );
}
