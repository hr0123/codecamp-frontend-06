//세번째것만 다른 데이터 보여주기
import { useQuery, gql } from "@apollo/client";
import BoardCommentItem from "../../src/components/units/boards/15-board-comment/index";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function MapBoardPage() {
  const { data } = useQuery(FETCH_BOARDS);
  // const [myIndex, setMyIndex] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);

  // const onClickEdit = (event) => {
  //   // 버튼 클릭 힌 해당id의 인덱스의 false를 true로
  //   const aaa = myIndex;
  //   aaa[event.target.id] = true;
  //   console.log(aaa);
  //   setMyIndex([...aaa]);
  // };
  
  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <BoardCommentItem key={el._id} el={el} />
      ))}
    </>
  );
}
