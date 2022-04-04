import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
// import { FETCH_BOARDS } from "./BoardList.queries";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useRouter } from "next/router";

export default function BoardList() {
  // const { data } = useQuery(FETCH_BOARDS);
  const { data, refetch } = useQuery(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  const router = useRouter();

  const onClickMoveToBoard = (event) => {
    router.push(`/boards/${event.target.id}`);
  }

  return (
    <BoardListUI
      data={data}
      refetch={refetch}
      dataBoardsCount={dataBoardsCount}
      onClickMoveToBoard={onClickMoveToBoard}
    />
  );
}
