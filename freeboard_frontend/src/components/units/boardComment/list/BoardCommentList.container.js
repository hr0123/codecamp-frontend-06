//댓글_조회_컨테이너
import BoardCommentListUI from "../list/BoardCommentList.presenter";
import { FETCH_BOARD_COMMENTS } from "./BoardCommentList.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function BoardCommentList() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });
  return <BoardCommentListUI data={data} />;
}
