import * as S from "./ProductsDetail.styles";
import DOMPurify from "dompurify";
// import Head from "next/head";

export default function ProductsDetailUI(props) {
  return (
    <S.Wrapper>
      {/* <div>판매자: {props.data?.fetchUseditem.seller}</div> */}
      <div>작성일자: {props.data?.fetchUseditem?.createdAt}</div>
      <div>상품명: {props.data?.fetchUseditem?.name}</div>
      <div>상품요약: {props.data?.fetchUseditem?.remarks}</div>
      <div>가격: {props.data?.fetchUseditem?.price}</div>
      <div>태그: {props.data?.fetchUseditem?.tags}</div>
      {/* <div>이미지: {props.data?.fetchUseditem.images}</div> */}
      {/* <div>상세설명: {props.data?.fetchUseditem?.contents}</div> */}
      {typeof window !== "undefined" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.data?.fetchUseditem.contents),
          }}
        ></div>
      ) : (
        <div></div>
      )}
      <div>지도: </div>
      <button onClick={props.onClickMoveToEdit}>수정하기</button>
      <button onClick={props.onClickDelete}>삭제하기</button>
      <button>찜하기</button>
      <button onClick={props.onClickBuy}>구매하기</button>
      <button onClick={props.onClickMoveToList}>목록으로</button>
    </S.Wrapper>
  );
}
