import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "./BoardList.queries";

export default function BoardList() {
  //목록fetch
  const { data } = useQuery(FETCH_BOARDS);

  return <BoardListUI data={data} />;
}
