//댓글등록/수정/삭제_컨테이너
import BoardCommentListUIItem from "../list/BoardCommentList.presenterItem";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries";
import { ChangeEvent, useState } from "react"; //📌ChangeEvent??
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import { IBoardCommentWriteProps } from "./BoardCommentWrite.types";

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentContents, setCommentContents] = useState("");
  const [rating, setRating] = useState(0);
  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);
  const router = useRouter();
  //댓글작성자인풋
  const onChangeCommentWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentWriter(event.target.value);
  };
  //댓글비밀번호인풋
  const onChangeCommentPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentPassword(event.target.value);
  };
  //댓글내용인풋
  const onChangeCommentContents = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentContents(event.target.value);
  };
  //댓글별점인풋
  const onChangeRating = (value: number) => {
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
      setRating(0);
      // 220410타입스크립트 작성하면서 ""->0으로 수정
    } catch (error) {
      alert(error.message);
    }
  };
  //댓글수정버튼
  const onClickCommentEdit = async () => {
    if (!commentContents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    if (!commentPassword) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    try {
      // 수정할 댓글 없으면 수정 안함
      if (!props.el?._id) return;
      // const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      // if (contents) updateBoardCommentInput.contents = contents;
      // if (star !== props.el?.rating) updateBoardCommentInput.rating = star;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: commentContents,
            rating: rating,
          },
          password: commentPassword,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      props.setIsEdit?.(false);
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
      onClickCommentEdit={onClickCommentEdit}
      isEdit={props.isEdit}
      el={props.el}
    />
  );
}
