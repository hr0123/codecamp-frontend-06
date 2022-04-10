// import { useQuery, gql } from "@apollo/client";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import styled from "@emotion/styled";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../../commons/types/generated/types";

// // 1.게시글 목록조회 API
// const FETCH_BOARDS = gql`
//   fetchBoards($page:Int){
//     fetchBoards(page:$page){
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

// // 7.게시글 전체총개수 API
// const FETCH_BOARDS_COUNT = gql`
//   query fetchBoardsCount {
//     fetchBoardsCount
//   }
// `;

const Pages = styled.div`
  cursor: pointer;
  font-size: 20px;
  color: ${(props) => (props.current === true ? "pink" : "black")};
  font-weight: ${(props) => (props.current === true ? "bold" : "normal")};
`;

const PrevPage = styled.span`
  cursor: pointer;
  font-size: 30px;
`;

const NextPage = styled.span`
  cursor: pointer;
  font-size: 30px;
`;

interface IPaginations01Props {
  dataBoardsCount?: number;
  fetchBoardsCount: number;
  startPage: number;
  lastPage: number;
  current: number;
  refetch: (
    variables: Partial<IQueryFetchBoardsArgs>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}

export default function Paginations01(props: IPaginations01Props) {
  // const { data, refetch } = useQuery(FETCH_BOARDS);
  // const { refetch } = useQuery(FETCH_BOARDS);

  // 7.게시글 전체총개수 API의 data를 useQuery로 받기
  // const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  // 8.맨마지막 페이지번호: (게시글 전체총수 / 한 페이지번호 당 게시글 수)올림한 정수
  const lastPage = Math.ceil(props.dataBoardsCount?.fetchBoardsCount / 10);
  // const lastPage = props.dataBoardsCount.fetchBoardsCount ? Math.ceil(props.dataBoardsCount.fetchBoardsCount / 10) : 0;

  // 2.페이지번호 만들기위해(인덱스에 더해서 만드므로 초기값1)
  const [startPage, setStartPage] = useState(1);

  // 4.현재페이지가 될수있는 전체 페이지번호들 중 첫값은 1이므로, 초기값 1
  const [current, setCurrent] = useState(1);

  // 3.페이지번호 클릭한 페이지의 id로 (1)목록 리패치+(2)페이지번호 색
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (!(event.target instanceof Element)) return;
    props.refetch({ page: Number(event.target.id) });
    setCurrent(Number(event.target.id));
  };

  const onClickPrevPage = () => {
    // 6.첫번호가 1이면, 아래 로직 실행안함
    if (startPage === 1) return;
    // 6.시작번호를 -10하고, 목록도 -10한 페이지로 리패치
    setStartPage((prev) => prev - 10);
    props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    // 8.다음페이지버튼 눌렀을때 나올 첫번호가 전체마지막번호보다 작지않으면, 아래로직 실행안함
    if (startPage + 10 >= lastPage) return;
    // 6.시작번호를 +10하고, 목록도 +10한 페이지로 리패치
    setStartPage((prev) => prev + 10);
    props.refetch({ page: startPage + 10 });
  };

  return (
    <>
      <PrevPage
        disabled={startPage === 1 ? true : false}
        onClick={onClickPrevPage}
      >
        &lt;
      </PrevPage>
      {/* 2.길이10인 임의 배열에 map하여, 페이지번호 10개 나열 */}
      {new Array(10).fill(1).map(
        (_, index) =>
          // 8.페이지번호는 맨마지막 페이지번호보다 작거나 같아야함
          index + startPage <= lastPage && (
            <Pages
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              // 5.스타일에로 props로 넘겨서 삼항연산자 쓰기위해 식
              current={current === index + startPage}
            >
              {` `} {index + startPage} {` `}
            </Pages>
          )
      )}
      <NextPage
        disabled={lastPage - startPage < 10 ? true : false}
        onClick={onClickNextPage}
      >
        &gt;
      </NextPage>
    </>
  );
}
