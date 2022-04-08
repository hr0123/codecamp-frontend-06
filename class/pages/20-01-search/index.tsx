// 검색창+검색버튼+게시글 목록(07-02)+페이지네이션(14-01)
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($search: String, $page: Int) {
    fetchBoards(search: $search, page: $page) {
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
  width: 25%;
`;

export default function MapBoardPage() {
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // input에 값을 입력할때마다 state에 저장(setState)
    setSearch(event.target.value);
  };

  const onClickSearch = () => {
    // "점심" 들어간 게시글 목록만 재조회(refetch)->화면 다시 그려짐
    // VALUE는 setSearch의 search -> (KEY=VALUE 같은단어면 한개만 씀)
    // 리패치 결과 목록 중 1페이지를 보여줘
    refetch({ search, page: 1 });
  };

  // 페이지네이션(14 - 01)
  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) });
  };

  return (
    <>
      검색어 입력 : <input type="text" onChange={onChangeSearch} />
      <button onClick={onClickSearch}>검색하기</button>
      {data?.fetchBoards.map((el) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
        </MyRow>
      ))}
      {/* 페이지네이션(14-01) */}
      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} onClick={onClickPage} id={String(index + 1)}>
          {index + 1}
        </span>
      ))}
    </>
  );
}
