//댓글목록_프레젠터
import BoardCommentListUIItem from "./BoardCommentList.presenterItem";
import InfiniteScroll from "react-infinite-scroller";
import { IBoardCommentListUIProps } from "./BoardCommentList.types";

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  return (
    <>
      <InfiniteScroll pageStart={0} loadMore={props.loadMore} hasMore={true}>
        {props.data?.fetchBoardComments.map((el) => (
          // UIItem에 map함수부분 빼고, props로 el넘겨주고, import
          <BoardCommentListUIItem key={el._id} el={el} data={props.data} />
        )) || <div></div>}
      </InfiniteScroll>
    </>
  );
}
