// 게시물_상세_컨테이너
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD } from "./BoardDetail.queries";.
// import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries";

import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
// import { useQuery, useMutation } from "@apollo/client";

export default function BoardDetail() {
  const router = useRouter();
  // console.log(router);
  // const [deleteBoard] = useMutation(DELETE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: String(router.query.boardId) },
  });
  // console.log(data);

  const onClickMoveToBoardList = () => {
    router.push("/boards");
  };

  const onClickMoveToBoardEdit = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  // const onClickBoardDelete = () => {
  //   deleteBoard({
  //     variables: { boardId: String(router.query.boardId) },
  //     refetchQueries: [{ query: FETCH_BOARD }],
  //   });
  //   router.push("/boards");
  //   alert("게시물이 삭제되었습니다.");
  // };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      // onClickBoardDelete={onClickBoardDelete}
    />
  );
}
