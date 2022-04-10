import {
  IBoardComment,
  IQuery,
} from "../../../../commons/types/generated/types";

export interface IBoardCommentListUIProps {
  data?: Pick<IQuery, "fetchBoardComments">;
  loadMore: () => void;
}
export interface IBoardCommentListUIItemProps {
  el: IBoardComment;
}
