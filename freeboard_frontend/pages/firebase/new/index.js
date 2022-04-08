import { useRouter } from "next/router";
import { useState } from "react";
import { collection, getFirestore, addDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../../_app";

export default function FirebaseBoardWritePage() {
  const [writer, setWriter] = useState("");
  const [contents, setContents] = useState("");
  const router = useRouter();

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };
  const onChangeContents = (event) => {
    setContents(event.target.value);
  };
  const onClickPost = async () => {
    const board = collection(getFirestore(firebaseApp), "board");
    await addDoc(board, {
      writer,
      contents,
    });
    alert("게시물 등록 성공");
    router.push("/firebase");
  };

  return (
    <>
      <div>
        작성자:
        <input type="text" onChange={onChangeWriter} />
      </div>
      <div>
        내용:
        <input type="text" onChange={onChangeContents} />
      </div>
      <div>
        <button onClick={onClickPost}>등록</button>
      </div>
    </>
  );
}
