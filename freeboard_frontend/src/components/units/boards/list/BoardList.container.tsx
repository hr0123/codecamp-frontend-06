import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
// import { FETCH_BOARDS } from "./BoardList.queries";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import _ from "lodash";
import {
  IQuery,
  IQueryFetchBoardArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";

export default function BoardList() {
  // const { data } = useQuery(FETCH_BOARDS);
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardArgs
  >(FETCH_BOARDS);

  // 페이지네이션
  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  // 검색1)
  const getDebounce = _.debounce((data) => {
    // 0.2초간 재발(입력) 안할 시 실행시킬 로직
    refetch({ search: data, page: 1 });
    setKeyword(data);
  }, 200);

  // 검색2)
  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

  const onClickMoveToBoard = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element)
      router.push(`/boards/${event.currentTarget.id}`);
  };
  // .js파일 버전(타입스크립트 뺸거)
  // const onClickMoveToBoard = (event) => {
  //   router.push(`/boards/${event.currentTarget.id}`);
  // };

  return (
    <BoardListUI
      data={data}
      refetch={refetch}
      dataBoardsCount={dataBoardsCount}
      onClickMoveToBoard={onClickMoveToBoard}
      onChangeSearch={onChangeSearch}
      keyword={keyword}
    />
  );
}
