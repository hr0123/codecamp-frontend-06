import * as S from "./ProductsDetail.styles";
import { getDate } from "../../../../commons/libraries/utils";
import DOMPurify from "dompurify";
import Script from "next/script";
// import Head from "next/head";

export default function ProductsDetailUI(props) {
  return (
    <S.Wrapper>
      <div onClick={props.onClickPick}>
        {/* 찜하기:{props.pickData?.fetchUseditemsCountIPicked} */}
        찜하기:{props.data?.fetchUseditem?.pickedCount}
      </div>
      <div>판매자: {props.data?.fetchUseditem?.seller?.name}</div>
      <div>작성일자: {getDate(props.data?.fetchUseditem?.createdAt)}</div>
      <div>상품명: {props.data?.fetchUseditem?.name}</div>
      <div>상품요약: {props.data?.fetchUseditem?.remarks}</div>
      <div>가격: {props.data?.fetchUseditem?.price}</div>
      <div>태그: {props.data?.fetchUseditem?.tags}</div>
      <S.ImageWrapper>
        {props.data?.fetchUseditem.images
          ?.filter((el) => el)
          .map((el) => (
            <S.Image key={el} src={`https://storage.googleapis.com/${el}`} />
          ))}
      </S.ImageWrapper>
      <Script src="" />
      <div id="map" style={{ width: 384, height: 252 }}></div>
      {typeof window !== "undefined" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.data?.fetchUseditem.contents),
          }}
        ></div>
      ) : (
        <div></div>
      )}
      <div>주소: {props.data?.fetchUseditem?.useditemAddress?.address}</div>
      <div>
        상세주소: {props.data?.fetchUseditem?.useditemAddress?.addressDetail}
      </div>
      {/* <div>{props.data?.fetchUseditem?.useditemAddress?.lat}</div>
      <div>{props.data?.fetchUseditem?.useditemAddress?.lng}</div> */}
      <button onClick={props.onClickMoveToEdit}>수정하기</button>
      <button onClick={props.onClickDelete}>삭제하기</button>
      <button>찜하기</button>
      <button onClick={props.onClickBuy}>구매하기</button>
      <button onClick={props.onClickMoveToList}>목록으로</button>
    </S.Wrapper>
  );
}
