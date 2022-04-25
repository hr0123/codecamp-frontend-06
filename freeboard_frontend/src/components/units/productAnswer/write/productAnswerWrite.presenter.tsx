import * as S from "./productAnswerWrite.styles";

export default function ProductAnswerWriteUI(props) {
  return (
    <S.CommentWrapper>
      <S.CommentPost>
        <S.Answer src="/answerArrow.png" />
        {/* <S.CommentHead>
          <S.CommentHeadImg src="/comment_head.png" />
          <S.CommentHeadTitle>문의하기</S.CommentHeadTitle>
        </S.CommentHead> */}
        <S.CommentPostBody>
          <S.CommentContents
            type="text"
            placeholder="답글을 등록해주세요."
            onChange={props.onChangeAnswerContents}
            // value={props.answerContents}
          />
          <S.CommentPostButtonWrapper>
            <S.ContentsLength>
              {props.answerContents.length}/100
            </S.ContentsLength>
            <S.CommentPostButton onClick={props.onClickAnswerPost}>
              {/* <S.CommentPostButton
              onClick={
                props.isAnswer
                  ? props.onClickAnswerPost
                  : props.onClickAnswerEdit
              }
            > */}
              답글
              {/* 답글{props.isAnswer ? "등록" : "수정"} */}
            </S.CommentPostButton>
          </S.CommentPostButtonWrapper>
        </S.CommentPostBody>
      </S.CommentPost>
    </S.CommentWrapper>
  );
}
