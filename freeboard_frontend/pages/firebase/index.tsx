import { useEffect, useState } from "react";
import { firebaseApp } from "../_app";
import {
  collection,
  getFirestore,
  getDocs,
  DocumentData
} from "firebase/firestore/lite";
// import { collection, getFirestore, getDocs } from "firebase/firestore/lite";

import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function FirebaseBoardFetchPage() {
  const [dataBoards,setDataBoards]=useState<DocumentData[]>([])
  // const [dataBoards, setDataBoards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchBoards() {
      const board = collection(getFirestore(firebaseApp), "board");
      const result = await getDocs(board);
      const boards = result.docs.map((el) => el.data());
      setDataBoards(boards);
    }
    fetchBoards();
  }, []);

  const onClickMovetoWrite = () => {
    router.push("/firebase/new");
  };
  return (
    <>
      <div>
        <div>번호</div>
        <div>작성자</div>
        <div>내용</div>
      </div>
      {dataBoards?.map((el, index) => (
        <div key={uuidv4()}>
          <div>{index + 1}</div>
          <div>{el.writer}</div>
          <div>{el.contents}</div>
        </div>
      ))}
      <button onClick={onClickMovetoWrite}>글쓰기 페이지로</button>
    </>
  );
}
