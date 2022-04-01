import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import styled from "@emotion/styled";

//⭐1.Playground를 참고하여, 게시글 목록(fetchBoards) API를 요청
const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

//⭐7-1.목록의 게시글 총갯수 조회(fetchBoardsCount): (객체로)데이터 받아오는거 없어서 중괄호X
const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

const BoardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Boards = styled.div``;
const Pages = styled.span`
  color: ${(props) => (props.current === true ? "pink" : "black")};
  cursor: pointer;
`;
const Prev = styled.span`
  cursor: pointer;
`;
const Next = styled.span`
  cursor: pointer;
`;

export default function QuizPagination(props) {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const [startPage, setStartPage] = useState(1);
  //⭐7-2.맨 마지막 페이지번호 구해서->이후 번호는 안띄우기
  const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount / 10);

  const [isActive, setIsActive] = useState(true);

  const [current, setCurrent] = useState(1);

  const onClickPage = (event) => {
    //⭐4.클릭한 페이지의 데이터 불러오기(fetchBoards의 page로 refetch)
    refetch({ page: Number(event.target.id) });
    //⭐5.현재 클릭한 페이지 번호 색 변경
    setCurrent(Number(event.target.id));
  };

  const onClickPrevPage = (event) => {
    //⭐8.첫페이지에서는 이전페이지로 못가고+버튼 안눌리게
    if (startPage === 1) {
      setIsActive(false);
      return;
    } else {
      setIsActive(true);
      //⭐6-1.페이지들을 10개 이전으로 교체
      setStartPage((prev) => prev - 10);
      //⭐6-2.목록을 10개 이전 데이터로 교체(refetch의 variables인 page = id이므로)
      refetch({ page: startPage - 10 });
    }
  };

  const onClickNextPage = () => {
    //⭐8.startPage+10(다음페이지버튼 눌렀을때 나오는 페이지번호들중 첫번째번호)가 lastPage(맨 마지막 페이지번호)보다 크면, 다음페이지로 못넘어가게
    if (startPage + 10 >= lastPage) {
      //그리고 버튼 안눌리게
      setIsActive(false);
      return;
    } else {
      setIsActive(true);
      //⭐6-1.페이지들을 10개 이후로 교체
      setStartPage((prev) => prev + 10);
      //⭐6-2.목록을 10개 이후 데이터로 교체(refetch의 variables인 page = id이므로)
      refetch({ page: startPage + 10 });
    }
  };

  return (
    <>
      {/*⭐2. 1에서 요청한 게시글 목록 데이터를 화면에 간단한 표 형태로 출력(map) */}
      {data?.fetchBoards.map((el) => (
        <BoardsWrapper key={el._id}>
          <Boards>{el.writer}</Boards>
          <Boards>{el.title}</Boards>
        </BoardsWrapper>
      ))}
      <Prev onClick={onClickPrevPage}>&lt;</Prev>
      {/*⭐3.표 하단에 페이지번호 10개 나열(10개의 임의 배열을 만든 후, map) */}
      {new Array(10).fill(1).map(
        (_, index) =>
          //⭐7-3.첫번째페이지번호가 전체마지막페이지번호보다 작거나 같을때만 페이지번호들 보이게
          index + startPage <= lastPage && (
            <Pages
              key={index + startPage}
              onClick={onClickPage}
              id={String(index + startPage)}
              current={index + startPage === current}
            >
              {` `} {index + startPage} {` `}
            </Pages>
          )
      )}
      <Next onClick={onClickNextPage}>&gt;</Next>
    </>
  );
}
