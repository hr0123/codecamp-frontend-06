import * as S from "./ProductsDetail.styles";
import { getDate } from "../../../../commons/libraries/utils";
import DOMPurify from "dompurify";
import Script from "next/script";
// import Head from "next/head";

export default function ProductsDetailUI(props) {
  return (
    <S.Page>
      <S.TopWrapper>
        <S.ImageWrapper>
          {props.data?.fetchUseditem.images
            ?.filter((el) => el)
            .map((el) => (
              <S.Image key={el} src={`https://storage.googleapis.com/${el}`} />
            ))}
        </S.ImageWrapper>
        <S.TopRight>
          <S.NamePriceWrapper>
            <S.Top>
              <S.Name>{props.data?.fetchUseditem?.name}</S.Name>
              <S.Edit src="/edit.png" onClick={props.onClickMoveToEdit} />
              <S.Delete src="/delete.png" onClick={props.onClickDelete} />
            </S.Top>
            <S.Price>{props.data?.fetchUseditem?.price}원</S.Price>
          </S.NamePriceWrapper>
          <S.RemarkTagWrapper>
            <div>{getDate(props.data?.fetchUseditem?.createdAt)}</div>
            <S.Remarks>{props.data?.fetchUseditem?.remarks}</S.Remarks>
            <S.Tags>{props.data?.fetchUseditem?.tags}</S.Tags>
          </S.RemarkTagWrapper>
          <S.ButtonWrapper>
            <S.Pick onClick={props.onClickPick}>
              찜 {props.data?.fetchUseditem?.pickedCount}
            </S.Pick>
            <S.Buy onClick={props.onClickBuy}>구매하기</S.Buy>
            <S.MovetoList onClick={props.onClickMoveToList}>목록</S.MovetoList>
          </S.ButtonWrapper>
        </S.TopRight>
      </S.TopWrapper>
      <S.Body>
        <S.BodyLeft>
          <S.BodyTitle>상품 정보</S.BodyTitle>
          {typeof window !== "undefined" ? (
            <S.Contents
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.data?.fetchUseditem.contents),
              }}
            ></S.Contents>
          ) : (
            <S.Contents></S.Contents>
          )}
          <S.MapTitleWrapper>
            <img src="/position.png" style={{ width: 23, height: 30 }} />
            <S.MapTitle>거래지역</S.MapTitle>
          </S.MapTitleWrapper>
          <Script src="" />
          <S.Map id="map" style={{ width: 700, height: 380 }}></S.Map>
          <S.Address>
            {props.data?.fetchUseditem?.useditemAddress?.address}
          </S.Address>
          <S.AddressDetail>
            {props.data?.fetchUseditem?.useditemAddress?.addressDetail}
          </S.AddressDetail>
          {/* <div>{props.data?.fetchUseditem?.useditemAddress?.lat}</div>
      <div>{props.data?.fetchUseditem?.useditemAddress?.lng}</div> */}
        </S.BodyLeft>
        <S.BodyRight>
          <S.BodyTitle>판매자 정보</S.BodyTitle>
          <S.UserWrapper>
            <img src="/detailUser.png" style={{ width: 75, height: 75 }} />
            <S.User>{props.data?.fetchUseditem?.seller?.name}</S.User>
          </S.UserWrapper>
        </S.BodyRight>
      </S.Body>
    </S.Page>
  );
}
