import * as S from "./productQuestionWrite.styles";

export default function ProductQuestionWriteUI(props) {
  return (
    <S.CommentWrapper>
      <S.CommentPost>
        <S.CommentHead>
          <S.CommentHeadImg src="/comment_head.png" />
          <S.CommentHeadTitle>
            {props.isEdit ? "수정" : "문의"}하기
          </S.CommentHeadTitle>
        </S.CommentHead>
        <S.CommentPostBody>
          <S.CommentContents
            type="text"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            onChange={props.onChangeQuestionContents}
            value={props.questionContents}
          />
          <S.CommentPostButtonWrapper>
            <S.ContentsLength>
              {props.questionContents.length}/100
            </S.ContentsLength>
            <S.CommentPostButton
              onClick={
                props.isEdit
                  ? props.onClickQuestionEdit
                  : props.onClickQuestionPost
              }
            >
              {props.isEdit ? "수정" : "문의"}하기
            </S.CommentPostButton>
          </S.CommentPostButtonWrapper>
        </S.CommentPostBody>
      </S.CommentPost>
    </S.CommentWrapper>
  );
}
