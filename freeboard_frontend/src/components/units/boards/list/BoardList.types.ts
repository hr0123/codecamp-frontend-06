import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";
import { ApolloQueryResult } from "@apollo/client";

export interface IBoardListUIProps {
  data: any;
  refetch: (
    variables: Partial<IQueryFetchBoardArgs>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  dataBoardsCount: number;
  onClickMoveToBoard: (event: MouseEvent<HTMLDivElement>) => void;
  // onChangeSearch
  // keyword
}
