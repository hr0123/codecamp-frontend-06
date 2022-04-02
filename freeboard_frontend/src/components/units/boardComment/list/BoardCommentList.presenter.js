//댓글_조회_프레젠터 (무한스크롤)
import * as S from "./BoardCommentList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import InfiniteScroll from "react-infinite-scroller";
import { Modal } from "antd";

export default function BoardCommentListUI(props) {
  return (
    <>
      {props.openDeleteModal && (
        <Modal
          visible={true}
          onOk={props.onClickDelete}
          onCancel={props.onClickCancel}
        >
          <div>비밀번호 입력: </div>
          <S.PasswordInput
            type="password"
            onChange={props.onChangeDeletePassword}
          />
        </Modal>
      )}
      <InfiniteScroll pageStart={0} loadMore={props.loadMore} hasMore={true}>
        {props.data?.fetchBoardComments.map((el) => (
          <S.CommentFetch key={el._id}>
            <S.CommentFetchImg src="/commentImg.png" />
            <S.CommentFetchWrapper>
              <S.CommentFetchTop>
                <S.CommentFetchTopLeft>
                  <S.CommentFetchWriter>{el.writer}</S.CommentFetchWriter>
                  <S.CommentFetchRating value={el?.rating} disabled />
                </S.CommentFetchTopLeft>
                <S.CommentFetchTopRight>
                  <S.CommentEditButton>
                    <S.CommentEdit src="/commentEdit.png" />
                  </S.CommentEditButton>
                  <S.CommentDeleteButton>
                    <S.CommentDelete
                      src="/commentDelete.png"
                      id={el._id}
                      onClick={props.onClickOpenDeleteModal}
                    />
                  </S.CommentDeleteButton>
                </S.CommentFetchTopRight>
              </S.CommentFetchTop>
              <S.CommentFetchContents>{el.contents}</S.CommentFetchContents>
              <S.CommentFetchDate>{getDate(el.createdAt)}</S.CommentFetchDate>
            </S.CommentFetchWrapper>
          </S.CommentFetch>
        ))}
      </InfiniteScroll>
    </>
  );
}
