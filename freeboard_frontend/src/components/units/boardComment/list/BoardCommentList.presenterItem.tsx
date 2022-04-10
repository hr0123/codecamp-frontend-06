//댓글목록_프레젠터item
import BoardCommentWrite from "../write/BoardCommentWrite.container";
import * as S from "./BoardCommentList.styles";
import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardCommentList.queries";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { Modal } from "antd";
import { getDate } from "../../../../commons/libraries/utils";
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import { IBoardCommentListUIItemProps } from "./BoardCommentList.types";

export default function BoardCommentListUIItem(
  props: IBoardCommentListUIItemProps
) {
  const router = useRouter();

  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);
  // [1]삭제버튼 클릭->비밀번호 입력 모달 뜸/ 삭제완료 후->끔
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // [2]모달에 입력하는 비밀번호
  const [passwordForDelete, setPasswordForDelete] = useState("");
  // [3]삭제되는 댓글 Id
  const [deleteId, setDeleteId] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const onClickOpenDeleteModal = (event) => {
    setOpenDeleteModal(true);
    if (event.target) setDeleteId(event.target.id);
  };

  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordForDelete(event.target.value);
  };

  const onClickDelete = async () => {
    try {
      await deleteBoardComment({
        variables: {
          password: passwordForDelete,
          boardCommentId: String(props.el._id),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: String(router.query.boardId) },
          },
        ],
      });
      setOpenDeleteModal(false);
      // 다음에 있을 댓글삭제 위해 초기값""으로 원복
      setDeleteId("");
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  const onClickCancel = (event) => {
    setOpenDeleteModal(false);
  };

  const onClickCommentEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      {openDeleteModal && (
        <Modal visible={true} onOk={onClickDelete} onCancel={onClickCancel}>
          <div>비밀번호 입력: </div>
          <S.PasswordInput type="password" onChange={onChangeDeletePassword} />
        </Modal>
      )}
      {!isEdit && (
        <S.CommentFetch>
          <S.CommentFetchImg src="/commentImg.png" />
          <S.CommentFetchWrapper>
            <S.CommentFetchTop>
              <S.CommentFetchTopLeft>
                <S.CommentFetchWriter>{props.el.writer}</S.CommentFetchWriter>
                <S.CommentFetchRating value={props.el?.rating} disabled />
              </S.CommentFetchTopLeft>
              <S.CommentFetchTopRight>
                <S.CommentEditButton>
                  <S.CommentEdit
                    src="/commentEdit.png"
                    onClick={onClickCommentEdit}
                  />
                </S.CommentEditButton>
                <S.CommentDeleteButton>
                  <S.CommentDelete
                    src="/commentDelete.png"
                    id={props.el._id}
                    onClick={onClickOpenDeleteModal}
                  />
                </S.CommentDeleteButton>
              </S.CommentFetchTopRight>
            </S.CommentFetchTop>
            <S.CommentFetchContents>{props.el.contents}</S.CommentFetchContents>
            <S.CommentFetchDate>
              {getDate(props.el.createdAt)}
            </S.CommentFetchDate>
          </S.CommentFetchWrapper>
        </S.CommentFetch>
      )}
      {isEdit && (
        <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      )}
    </>
  );
}
