//댓글_조회_컨테이너 (무한스크롤)
import BoardCommentListUI from "./BoardCommentList.presenter";
import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardCommentList.queries";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "antd";

export default function BoardCommentList() {
  const router = useRouter();
  // [1]삭제버튼 클릭->비밀번호 입력 모달 뜸/끔
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // [2]모달에 입력하는 비밀번호
  const [passwordForDelete, setPasswordForDelete] = useState("");
  // [3]삭제되는 댓글 Id
  const [deleteId, setDeleteId] = useState("");

  const { data, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

  const loadMore = () => {
    // 1.fetchBoardComments없으면, More로직 중단
    if (!data) return;
    // 2.댓글 더 조회하기
    fetchMore({
      // 댓글 전체갯수를 10(한page당 댓글 수)로 나누고, 올리고, +1(소숫점아래 포함 위해)
      variables: { page: Math.ceil(data.fetchBoardComments.length / 10) + 1 },
      // rev(fetchBoardComments의 useQuery)를 수정 -> 2가지 케이스
      updateQuery: (prev, { fetchMoreResult }) => {
        // 2-(1)더조회할 댓글 없으면->기존 댓글 보여주기
        if (!fetchMoreResult.fetchBoardComments)
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        // 2-(2)더조회할 댓글 있으면->기존 댓글+더조회 결과
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  const onClickOpenDeleteModal = (event) => {
    setOpenDeleteModal(true);
    if (event.target) setDeleteId(event.target.id);
  };

  const onChangeDeletePassword = (event) => {
    setPasswordForDelete(event.target.value);
  };

  const onClickDelete = async () => {
    try {
      await deleteBoardComment({
        variables: { password: passwordForDelete, boardCommentId: deleteId },
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
  return (
    <BoardCommentListUI
      data={data}
      loadMore={loadMore}
      onClickOpenDeleteModal={onClickOpenDeleteModal}
      openDeleteModal={openDeleteModal}
      onChangeDeletePassword={onChangeDeletePassword}
      onClickDelete={onClickDelete}
      onClickCancel={onClickCancel}
    />
  );
}
