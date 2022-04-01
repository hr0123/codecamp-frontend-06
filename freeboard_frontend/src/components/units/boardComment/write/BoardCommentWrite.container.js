//댓글_등록_컨테이너
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { useState } from "react"; //📌ChangeEvent??
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT } from "./BoardCommentWrite.queries";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import { useRouter } from "next/router";

export default function BoardCommentWrite() {
  //댓글
  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentContents, setCommentContents] = useState("");
  const [rating, setRating] = useState(0);
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const router = useRouter();
  //댓글작성자인풋
  const onChangeCommentWriter = (event) => {
    setCommentWriter(event.target.value);
  };
  //댓글비밀번호인풋
  const onChangeCommentPassword = (event) => {
    setCommentPassword(event.target.value);
  };
  //댓글내용인풋
  const onChangeCommentContents = (event) => {
    setCommentContents(event.target.value);
  };
  //댓글별점인풋
  const onChangeRating = (value) => {
    setRating(value);
  };
  //댓글등록버튼
  const onClickCommentPost = async () => {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPassword,
            contents: commentContents,
            rating: rating,
          },
          boardId: String(router.query.boardId),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setCommentWriter("");
      setCommentPassword("");
      setCommentContents("");
      setRating("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BoardCommentWriteUI
      onChangeCommentWriter={onChangeCommentWriter}
      onChangeCommentPassword={onChangeCommentPassword}
      onChangeCommentContents={onChangeCommentContents}
      onChangeRating={onChangeRating}
      onClickCommentPost={onClickCommentPost}
      commentContents={commentContents}
      commentWriter={commentWriter}
      commentPassword={commentPassword}
      rating={rating}
    />
  );
}
