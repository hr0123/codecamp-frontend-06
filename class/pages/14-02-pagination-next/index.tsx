// 페이지네이션2_이전,다음페이지
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

  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) }); //onClickPage함수가 id별로 실행됨
  };

  // 📌이전 페이지 클릭 시->페이지번호 첫번째꺼(prev startPage)-10
  const onClickPrevPage = () => {
    setStartPage((prev) => prev - 10);
  };

  // 📌다음 페이지 클릭 시->페이지번호 첫번째꺼(prev startPage)+10
  const onClickNextPage = () => {
    setStartPage((prev) => prev + 10);
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
      {new Array(10).fill(1).map((_, index) => (
        <span
          key={index + startPage}
          onClick={onClickPage}
          id={String(index + startPage)}
        >
          {index + startPage}
        </span>
      ))}
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
