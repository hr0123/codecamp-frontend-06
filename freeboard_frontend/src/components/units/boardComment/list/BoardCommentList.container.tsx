//댓글목록_컨테이너
import BoardCommentListUI from "./BoardCommentList.presenter";
import { FETCH_BOARD_COMMENTS } from "./BoardCommentList.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";

export default function BoardCommentList() {
  const router = useRouter();

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });

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
        if (!fetchMoreResult?.fetchBoardComments)
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

  return <BoardCommentListUI data={data} loadMore={loadMore} />;
}
