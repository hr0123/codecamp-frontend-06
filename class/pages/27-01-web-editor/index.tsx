// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// 서버사이드(ssr)에서도 import할것인지(안하려면false), 브라우저(클라이언트)사이드에서 import할것인지 선택

export default function WebEditorPage() {
  const onChangeContents = (value: string) => {
    // event가 들어오는게 아니고, 변경된 value(인자)가 바로 들어오는 것_*npm참고
    console.log(value);
  };

  return (
    <div>
      작성자: <input type="text" />
      <br />
      비밀번호: <input type="password" />
      <br />
      제목: <input type="text" />
      <br />
      내용:
      <ReactQuill onChange={onChangeContents} />
      <br />
      <button>등록하기</button>
    </div>
  );
}
