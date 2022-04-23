import DOMPurify from "dompurify";
import * as S from "./ProductsDetail.styles";
import Head from "next/head";

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
      {/* <div>태그: {props.data?.fetchUseditem.tags}</div> */}
      <div>지도: </div>
      <button onClick={props.onClickMoveToEdit}>수정하기</button>
      <button onClick={props.onClickDelete}>삭제하기</button>
      {/* 📌STEP1 아임포트 라이브러리 추가하기 */}
      <Head>
        {/* <!-- jQuery --> */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        {/* <!-- iamport.payment.js --> */}
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <button onClick={props.onClickBuy}>구매하기</button>
      <button onClick={props.onClickMoveToList}>목록으로</button>
    </S.Wrapper>
  );
}
