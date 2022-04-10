import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
// import { FETCH_BOARDS } from "./BoardList.queries";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useRouter } from "next/router";
import { useState } from "react";
import _ from "lodash";

export default function BoardList() {
  // const { data } = useQuery(FETCH_BOARDS);
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const onClickMoveToBoard = (event) => {
    router.push(`/boards/${event.target.id}`);
  };

  const getDebounce = _.debounce((data) => {
    // 0.2초간 재발(입력) 안할 시 실행시킬 로직
    refetch({ search: data, page: 1 });
    setKeyword(data);
  }, 200);

  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

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
