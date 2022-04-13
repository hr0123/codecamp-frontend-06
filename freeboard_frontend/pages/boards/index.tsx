import BoardList from "../../src/components/units/boards/list/BoardList.container";
import { withAuth } from "../../src/components/commons/hoc/withAuth";
// export default function BoardListPage() {
//   return <BoardList />;
// }

function BoardListPage() {
  return <BoardList />;
}

export default withAuth(BoardListPage)
