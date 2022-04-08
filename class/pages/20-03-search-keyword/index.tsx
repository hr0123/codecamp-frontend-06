// 검색창+검색버튼X(검색창에 입력함과 동시에 리패치 뜸)
// +게시글 목록(07-02)+페이지네이션(14-01)
// lodash로 Debounce
// 검색 결과에 검색한 키워드 표시
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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
interface IProps {
  isMatched: boolean;
}
const Word = styled.span`
  color: ${(props: IProps) => (props.isMatched ? "red" : "black")};
`;

export default function MapBoardPage() {
  // const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const getDebounce = _.debounce((data) => {
    // 0.2초간 재발(입력) 안할 시 실행시킬 로직
    refetch({ search: data, page: 1 });
    setKeyword(data);
  }, 200);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // input에 값을 입력할때마다 state에 저장(setState)
    // setSearch(event.target.value);
    getDebounce(event.target.value);
  };

  // const onClickSearch = () => {
  //   // "점심" 들어간 게시글 목록만 재조회(refetch)->화면 다시 그려짐
  //   // VALUE는 setSearch의 search -> (KEY=VALUE 같은단어면 한개만 씀)
  //   // 리패치 결과 목록 중 1페이지를 보여줘
  //   refetch({ search, page: 1 });
  // };

  // 페이지네이션(14 - 01)
  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) });
  };

  return (
    <>
      검색어 입력 : <input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색하기</button> */}
      {data?.fetchBoards.map((el) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>
            {el.title
              .replaceAll(keyword, `#$%${keyword}#$%`)
              .split("#$%")
              .map((el) => (
                // <Word key={uuidv4()} isMatched={keyword === el ? true : false}>
                <Word key={uuidv4()} isMatched={keyword === el}>
                  {el}
                </Word>
              ))}
          </MyColumn>
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
