//댓글_조회_프레젠터
import * as S from "./BoardCommentList.styles";
import { getDate } from "../../../../commons/libraries/utils";

export default function BoardCommentListUI(props) {
  return (
    <>
      {props.data?.fetchBoardComments.map((el) => (
        <S.CommentFetch key={el._id}>
          <S.CommentFetchImg src="/commentImg.png" />
          <S.CommentFetchWrapper>
            <S.CommentFetchTop>
              <S.CommentFetchTopLeft>
                <S.CommentFetchWriter>{el.writer}</S.CommentFetchWriter>
                <S.CommentFetchRating>별점</S.CommentFetchRating>
              </S.CommentFetchTopLeft>
              <S.CommentFetchTopRight>
                <S.CommentEditButton>
                  <S.CommentEdit src="/commentEdit.png" />
                </S.CommentEditButton>
                <S.CommentDeleteButton>
                  <S.CommentDelete src="/commentDelete.png" />
                </S.CommentDeleteButton>
              </S.CommentFetchTopRight>
            </S.CommentFetchTop>
            <S.CommentFetchContents>{el.contents}</S.CommentFetchContents>
            <S.CommentFetchDate>{getDate(el.createdAt)}</S.CommentFetchDate>
          </S.CommentFetchWrapper>
        </S.CommentFetch>
      ))}
    </>
  );
}
