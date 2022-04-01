// 페이지네이션3_시작,마지막페이지
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled"; //한el map을 한행으로 만들기(flex)
import { useState } from "react";

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

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
    # 객체로 데이터 받아오는거 없으므로 중괄호X
  }
`;

const MyRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const MyColumn = styled.div`
  /* width: 25%; //전체 가로의 1/4 */
`;

export default function MapBoardPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const [startPage, setStartPage] = useState(1);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount / 10);

  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) }); //onClickPage함수가 id별로 실행됨
  };

  // 이전 페이지 클릭 시->페이지번호 첫번째꺼(prev startPage)-10
  const onClickPrevPage = () => {
    //📌startPage가 1이면 로직실행 중단
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    refetch({ page: startPage - 10 }); //onClickPage함수가 id별로 실행됨
  };

  // 다음 페이지 클릭 시->페이지번호 첫번째꺼(prev startPage)+10
  const onClickNextPage = () => {
    //📌startPage+10(다음나올페이지의 startPage)가 lastPage이거나 더 작아야함->안그러면 로직실행 중단
    if (!(startPage + 10 <= lastPage)) return;
    setStartPage((prev) => prev + 10);
    refetch({ page: startPage + 10 }); //onClickPage함수가 id별로 실행됨
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <MyRow key={el._id}>
          {/* <MyColumn>
            <input type="checkbox" />
          </MyColumn> */}
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
        </MyRow>
      ))}
      <span onClick={onClickPrevPage}>이전 페이지</span>
      {/* 1. 조건부렌더링 */}
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= lastPage && (
            <span
              key={index + startPage}
              onClick={onClickPage}
              id={String(index + startPage)}
            >
              {` `} {index + startPage}
            </span>
          )
      )}

      {/* 2. 삼항연산자 */}
      {/* {new Array(10).fill(1).map((_, index) =>
        index + startPage <= lastPage ? (
          <span
            key={index + startPage}
            onClick={onClickPage}
            id={String(index + startPage)}
          >
            {` `} {index + startPage}
          </span>
        ) : (
          <span></span>
        )
      )} */}
      <span onClick={onClickNextPage}>다음 페이지</span>

      {/* {[1,2,3,4,5,6,7,8,9,10].map((el) => (
        <span key={el} onClick={onClickPage} id={String(el)}>
          {el}
        </span>
      ))} */}

      {/* <span onClick={onClickPage} id="1">
        1
      </span>
      <span onClick={onClickPage} id="2">
        2
      </span>
      <span onClick={onClickPage} id="3">
        3
      </span> */}
    </>
  );
}
