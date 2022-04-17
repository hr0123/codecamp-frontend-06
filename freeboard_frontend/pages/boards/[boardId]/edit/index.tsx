//수정 페이지
import BoardWrite from "../../../../src/components/units/boards/write/BoardWrite.container";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
//수정페이지input(defaultValue)에, 등록한내용을 fetchBoard로 받아와서 뜨게하기위해 fetchBoard 여기서함
// -> 그 data를 props로 BoardWriteUI에 내려줘서 수정화면에서 defaultValue로 뜨게하기
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      youtubeUrl
      likeCount
      dislikeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;
export default function EditBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });
  return <BoardWrite isEdit={true} data={data} />;
}
