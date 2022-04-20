import * as S from "./ProductsDetail.styles";

export default function ProductsDetailUI(props) {
  return (
    <S.Wrapper>
      <div>판매자{props.data?.fetchUsedItem.seller}</div>
      <div>작성일자{props.data?.fetchUsedItem.createdAt}</div>
      <div>상품명{props.data?.fetchUsedItem.name}</div>
      <div>상품요약{props.data?.fetchUsedItem.remarks}</div>
      <div>가격{props.data?.fetchUsedItem.price}</div>
      <div>이미지{props.data?.fetchUsedItem.images}</div>
      <div>상세설명{props.data?.fetchUsedItem.contents}</div>
      <div>태그{props.data?.fetchUsedItem.tags}</div>
      <div>지도</div>
      <button onClick={props.onClickMoveToList}>목록으로</button>
      <button>구매하기</button>
    </S.Wrapper>
  );
}
