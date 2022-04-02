import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
// import { FETCH_BOARDS } from "./BoardList.queries";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";

export default function BoardList() {
  // const { data } = useQuery(FETCH_BOARDS);
  const { data, refetch } = useQuery(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  return (
    <BoardListUI
      data={data}
      refetch={refetch}
      dataBoardsCount={dataBoardsCount}
    />
  );
}
