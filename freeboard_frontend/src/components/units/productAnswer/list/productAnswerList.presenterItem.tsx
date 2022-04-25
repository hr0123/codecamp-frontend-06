import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { getDate } from "../../../../commons/libraries/utils";
import {
  IMutation,
  IMutationDeleteUseditemQuestionAnswerArgs,
} from "../../../../commons/types/generated/types";
import ProductAnswerWrite from "../write/productAnswerWrite.containter";
import {
  DELETE_USEDITEM_QUESTION_ANSWER,
  FETCH_USEDITEM_QUESTION_ANSWERS,
} from "./productAnswerList.queries";
import * as S from "./productAnswerList.styles";

export default function ProductAnswerListUIItem(props) {
  const router = useRouter();

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USEDITEM_QUESTION_ANSWER);

  // [1]삭제버튼 클릭->비밀번호 입력 모달 뜸/ 삭제완료 후->끔
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // [2]모달에 입력하는 비밀번호
  const [passwordForDelete, setPasswordForDelete] = useState("");
  // [3]삭제되는 댓글 Id
  const [deleteId, setDeleteId] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);

  const onClickOpenDeleteModal = (event) => {
    setOpenDeleteModal(true);
    if (event.target) setDeleteId(event.target.id);
  };
  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordForDelete(event.target.value);
  };

  const onClickDelete = async () => {
    console.log(props.QuestionEl);
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: String(props.el._id),
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTION_ANSWERS,
            variables: {
              useditemQuestionId: String(props.QuestionEl._id),
            },
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

  const onClickAnswer = () => {
    setIsAnswer(true);
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
          <S.Answer src="/answerArrow.png" />
          <S.CommentFetchImg src="/commentImg.png" />
          <S.CommentFetchWrapper>
            <S.CommentFetchTop>
              <S.CommentFetchTopLeft>
                <S.CommentFetchWriter>
                  {props.el.user.name}
                </S.CommentFetchWriter>
              </S.CommentFetchTopLeft>
              <S.CommentFetchTopRight>
                <img
                  src="/answer.png"
                  width="20px"
                  height="20px"
                  onClick={onClickAnswer}
                />
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
        <ProductAnswerWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      )}
      {isAnswer && <ProductAnswerWrite el={props.el} />}
    </>
  );
}
