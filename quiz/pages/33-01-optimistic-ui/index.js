import { gql, useMutation, useQuery } from "@apollo/client";

// 좋아요 수 조회 API
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

// 좋아요 증가 API
const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUIPage() {
  // 📌1.state에 담아서 화면에 보이게 하는 방법
  // const [,] = useState()

  // 좋아요 수 조회 API
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: "6269eccfa8255b002988d631" },
  });

  // 좋아요 증가: API, 버튼클릭함수
  const [likeBoard] = useMutation(LIKE_BOARD);
  const onClickOptimisticUI = () => {
    likeBoard({
      variables: { boardId: "6269eccfa8255b002988d631" },
      // 📌2.리패치 방법으로 좋아요 수 증가하는거 화면에 표시할 경우 => API요청이 두번됨
      // refetchQueries: [
      //   {
      //     query: FETCH_BOARD,
      //     variables: { boardId: "6269eccfa8255b002988d631" },
      //   },
      // ],
      // 📌3-1.요청,데이터 주고받는 시간 절약 위해 가짜 response(좋아요 수)를 먼저 화면에 / 그 후 실제로 받아온 진짜 response(증가된 좋아요 수)를 화면에 띄움
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount || 0) + 1, // 기존 개수 +1 -> 두번째 받아온거로 기존거(아래 cache옆 {data})를 덮어쓰기 하는것
      },
      // 📌3.GlobalState(cache)를 직접 바꿔줌(update) : fetchBoard로 받아온 data를 직접 조작=>리패치쿼리 안해도됨
      update(cache, { data }) {
        data.likeBoard;
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "6269eccfa8255b002988d631" },
          data: {
            fetchBoard: {
              //이 두가지는 필수입력(없으면 데이터를 못찾음)
              _id: "6269eccfa8255b002988d631",
              __typename: "Board",
              // API요청할때 받아올 데이터로 입력했던거/좋아요 수가 10이 되게 조작
              likeCount: data.likeBoard,
            },
          },
        });
      },
    });
  };

  return (
    // 게시글 상세화면_fetchBoard / 좋아요 버튼
    <div>
      <h1>옵티미스틱UI</h1>
      <div>현재 카운트(좋아요): {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickOptimisticUI}>좋아요 수 올리기!!</button>
    </div>
  );
}
