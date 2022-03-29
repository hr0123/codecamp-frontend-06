import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BoardWrite(props) {
  const [isActive, setIsActive] = useState(false);

  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onClickUpdate = async () => {
    if (!title && !content) {
      alert("수정한 내용이 없습니다.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    const updateBoardInput = {};
    if (title) updateBoardInput.title = title;
    if (content) updateBoardInput.contents = content;

    try {
      await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password,
          updateBoardInput,
        },
      });
      alert("게시물 수정에 성공하였습니다!");
      router.push(`/boards/${router.query.boardId}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickPost = async () => {
    if (name === "" || password === "" || title === "" || content === "") {
      alert("내용을 모두 입력해주세요.");
    } else {
      //상세페이지로 라우팅
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: content,
            },
          },
        });
        console.log(result);
        console.log(result.data.createBoard._id);
        alert("게시물 등록 성공");
        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  const onChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value && password && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
    if (name && event.target.value && title && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (name && password && event.target.value && content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
    if (name && password && title && event.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <BoardWriteUI
      onClickPost={onClickPost}
      onChangeName={onChangeName}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContent={onChangeContent}
      isActive={isActive}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      data={props.data}
    />
  );
}
