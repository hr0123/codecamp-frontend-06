import * as S from "./ProductsList.styles";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroller";

export default function ProductListUI(props) {
  return (
    <S.Wrapper>
      <S.Body>
        <S.Top>
          <S.Button>판매중인 상품</S.Button>
          <S.Button>판매된 상품</S.Button>
          <S.Search
            type="text"
            onChange={props.onChangeSearch}
            placeholder="제품을 검색해주세요."
          />
          {/* <S.Date type="date" placeholder="YYYY.MM.DD - YYYY.MM.DD" /> */}
          <S.Button>검색</S.Button>
        </S.Top>
        <S.ListWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.loadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.fetchUseditems.map((el, index) => (
              <S.List key={el._id}>
                <img
                  // key={el.images}
                  src={`https://storage.googleapis.com/${el.images}`}
                  style={{ width: 160, height: 160, cursor: "pointer" }}
                  onClick={props.onClickItem(el)}
                />
                <S.ListBody>
                  <S.Name id={el._id} onClick={props.onClickItem(el)}>
                    {el.name
                      .replaceAll(props.keyword, `#$%${props.keyword}#$%`)
                      .split("#$%")
                      .map((el) => (
                        <div key={uuidv4()} isMatched={props.keyword === el}>
                          {el}
                        </div>
                      ))}
                  </S.Name>
                  <S.Remarks>{el.remarks}</S.Remarks>
                  <S.Tags>{el.tags}</S.Tags>
                  <S.SellerCountWrapper>
                    <img
                      src="/writerPhoto.png"
                      style={{ width: 20, height: 20 }}
                    />
                    <S.Seller>{el.seller?.name}</S.Seller>
                    <img src="/pick.png" style={{ width: 20, height: 18.5 }} />
                    <div>{el.pickedCount}</div>
                  </S.SellerCountWrapper>
                </S.ListBody>
                <S.PriceWrapper>
                  <img src="/price.png" style={{ width: 18, height: 18 }} />
                  <S.Price onClick={props.onClickItem(el)}>
                    {el.price}원
                  </S.Price>
                </S.PriceWrapper>
              </S.List>
            ))}
          </InfiniteScroll>
        </S.ListWrapper>
        <S.PostButton onClick={props.onClickMoveToPost}>
          상품 등록하기
        </S.PostButton>
      </S.Body>
      <S.Today>
        <S.TodayTitle>오늘 본 상품</S.TodayTitle>
        {props.basketItems?.map((el) => (
          <S.TodayWrapper key={el._id}>
            <S.TodayPickWrapper>
              <img src="/pick.png" style={{ width: 15, height: 13.76 }} />
              <S.TodayPick>{el.pickedCount}</S.TodayPick>
            </S.TodayPickWrapper>
            <S.TodayImage
              // key={el.images}
              src={`https://storage.googleapis.com/${el.images}`}
              style={{ width: 60, height: 60, cursor: "pointer" }}
              id={el._id}
              onClick={props.onClickTodayItem}
            />
            <S.TodayName id={el._id} onClick={props.onClickTodayItem}>
              {el.name}
            </S.TodayName>
            <S.TodayRemarks id={el._id} onClick={props.onClickTodayItem}>
              {el.remarks}
            </S.TodayRemarks>
            <S.TodayPrice id={el._id} onClick={props.onClickTodayItem}>
              {el.price}원
            </S.TodayPrice>
            <S.TodayTags>{el.tags}</S.TodayTags>
          </S.TodayWrapper>
        ))}
      </S.Today>
    </S.Wrapper>
  );
}
