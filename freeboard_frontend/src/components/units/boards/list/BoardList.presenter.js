import * as S from "./BoardList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import Paginations01 from "../../../commons/paginations/01/index";

export default function BoardListUI(props) {
  return (
    <S.Wrapper>
      <S.Top>
        <S.SearchImage src="/search.png" />
        <S.SearchBox type="text" placeholder="제목을 검색해주세요." />
        <S.SearchDate type="date" placeholder="YYYY.MM.DD - YYYY.MM.DD" />
        <S.SearchButton>검색하기</S.SearchButton>
      </S.Top>
      {/* <S.List> */}
      <S.ListRow>
        <S.ListHead1>번호</S.ListHead1>
        <S.ListHead2>제목</S.ListHead2>
        <S.ListHead3>작성자</S.ListHead3>
        <S.ListHead4>날짜</S.ListHead4>
      </S.ListRow>
      {props.data?.fetchBoards.map((el, index) => (
        <S.ListRow key={el._id}>
          <S.ListIndex>{10 - index}</S.ListIndex>
          <S.ListTitle id={el._id} onClick={props.onClickMoveToBoard}>{el.title}</S.ListTitle>
          <S.ListWriter>{el.writer}</S.ListWriter>
          <S.ListDate>{getDate(el.createdAt)}</S.ListDate>
        </S.ListRow>
      ))}
      {/* </S.List> */}
      <S.Bottom>
        {/* <S.PageNumber>페이지</S.PageNumber> */}
        <Paginations01
          refetch={props.refetch}
          dataBoardsCount={props.dataBoardsCount}
        />
        <S.PostImage src="/list_post.png" />
        <S.PostButton>게시물 등록하기</S.PostButton>
      </S.Bottom>
    </S.Wrapper>
  );
}
