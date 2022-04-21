import * as S from "./ProductsList.styles";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroller";

export default function ProductListUI(props) {
  return (
    <S.Wrapper>
      <S.Body>
        <button>판매중인 상품</button>
        <button>판매된 상품</button>
        <input
          type="text"
          onChange={props.onChangeSearch}
          placeholder="제품을 검색해주세요."
        />
        <input type="date" placeholder="YYYY.MM.DD - YYYY.MM.DD" />
        <button>검색</button>
        <S.list>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.loadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.fetchUseditems.map((el, index) => (
              <div key={el._id}>
                <div id={el._id} onClick={props.onClickItem(el)}>
                  {el.name
                    .replaceAll(props.keyword, `#$%${props.keyword}#$%`)
                    .split("#$%")
                    .map((el) => (
                      <div key={uuidv4()} isMatched={props.keyword === el}>
                        {el}
                      </div>
                    ))}
                </div>
                <div>{el.remarks}</div>
                <div>{el.price}</div>
              </div>
            ))}
          </InfiniteScroll>
        </S.list>
        <button>상품 등록하기</button>
      </S.Body>
      <S.Today>
        {props.basketItems?.map((el) => (
          <div key={el._id}>
            <div id={el._id} onClick={props.onClickTodayItem}>
              {el.name}
            </div>
            <div>{el.remarks}</div>
            <div>{el.price}</div>
          </div>
        ))}
      </S.Today>
    </S.Wrapper>
  );
}
