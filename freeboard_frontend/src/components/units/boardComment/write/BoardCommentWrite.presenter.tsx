//댓글등록/수정_프레젠터
import * as S from "./BoardCommentWrite.styles";
import { IBoardCommentWriteUIProps } from "./BoardCommentWrite.types";

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  return (
    <S.CommentWrapper>
      <S.CommentPost>
        <S.CommentHead>
          <S.CommentHeadImg src="/comment_head.png" />
          <S.CommentHeadTitle>댓글</S.CommentHeadTitle>
        </S.CommentHead>
        <S.CommentPostTop>
          <S.CommentWriter
            type="text"
            placeholder="작성자"
            onChange={props.onChangeCommentWriter}
            value={props.commentWriter}
          />
          <S.CommentPassword
            type="password"
            placeholder="비밀번호"
            onChange={props.onChangeCommentPassword}
            value={props.commentPassword}
          />
          <S.Rating onChange={props.onChangeRating} value={props.rating} />
        </S.CommentPostTop>
        <S.CommentPostBody>
          <S.CommentContents
            type="text"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            onChange={props.onChangeCommentContents}
            value={props.commentContents}
          />
          <S.CommentPostButtonWrapper>
            <S.ContentsLength>
              {props.commentContents.length}/100
            </S.ContentsLength>
            <S.CommentPostButton
              onClick={
                props.isEdit
                  ? props.onClickCommentEdit
                  : props.onClickCommentPost
              }
            >
              {props.isEdit ? "수정" : "등록"}하기
            </S.CommentPostButton>
          </S.CommentPostButtonWrapper>
        </S.CommentPostBody>
      </S.CommentPost>
    </S.CommentWrapper>
  );
}
