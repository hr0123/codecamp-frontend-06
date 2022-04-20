// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// 서버사이드(ssr)에서도 import할것인지(안하려면false), 브라우저(클라이언트)사이드에서 import할것인지 선택

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;
export default function WebEditorPage() {
  const [createBoard] = useMutation(CREATE_BOARD);
  const router = useRouter();

  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value: string) => {
    // event가 들어오는게 아니고, 변경된 value(인자)가 바로 들어오는 것_*npm참고
    console.log(value);
    // ReactQuill부분은 register로 등록하지않고, 강제로 "contents"라는 키와 그 값으로 해당value를 넣어줌
    // value가 <p><br></p>이면(입력칸 빈 상태)=>값으로 ""를 넣어주고 / 아니라면=>값으로 value를 넣어줌
    setValue("contents", value === "<p><br></p>" ? "" : value);
    // 작성자,비번,제목은 register여서 변경하자마자 내용출력 되는반면, 내용의 "contents"키를 강제로 onChange를 실행시켜줘야함
    // ⭐내용이 onChange됐다고 react-hook-form에 알려주는 기능⭐
    trigger("contents");
  };

  const onClickSubmit = async (data) => {
    // 모두 없을 경우 → alert+종결
    if (!(data.writer && data.password && data.title && data.contents)) {
      // alert("모두 입력해주세요!");
      Modal.error({ content: "모두 입력해주세요!" });
      return;
    }

    // (위에서 만든)등록mutation 날리기
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            // register로 만든 각각은 data안에 들어있음
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      router.push(`/27-04-web-editor-detail/${result.data.createBoard._id}`);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register("writer")} />
      <br />
      비밀번호: <input type="password" {...register("password")} />
      <br />
      제목: <input type="text" {...register("title")} />
      <br />
      내용: <ReactQuill onChange={onChangeContents} />
      <br />
      <button>등록하기</button>
    </form>
  );
}
