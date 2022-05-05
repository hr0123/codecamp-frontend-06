import * as S from "./mypage.styles";
import Head from "next/head";
import { getDate } from "../../../commons/libraries/utils";
import InfiniteScroll from "react-infinite-scroller";

export default function MypageUI(props) {
  return (
    <S.Wrapper>
      <S.Left>
        <S.Title>MYPAGE</S.Title>
        <S.Pofile src="/writerPhoto.png" />
        <S.Name>{props.userInfo.name}</S.Name>
        <S.Point>
          {/*📌STEP1.아임포트 라이브러리 추가하기 */}
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
          <S.AmountInput
            type="text"
            placeholder="충전할 금액을 입력해주세요"
            onChange={props.onChangeCreatePointAmount}
          />
          <button onClick={props.onClickCreatePoint}>포인트 충전</button>
          <div>
            {/* 충전완료 포인트: */}
            {/* {props.data?.fetchPointTransactionsOfLoading.amount} */}
            현재 포인트:
            {props.data?.fetchUserLoggedIn.userPoint.amount}
          </div>
          <div>
            기준일시:
            {/* {props.data?.fetchPointTransactionsOfLoading.createdAt} */}
            {/* {props.data?.fetchUserLoggedIn.userPoint.createdAt} */}
            {props.data?.fetchUserLoggedIn.userPoint.updatedAt}
            {/* ↑안됨 */}
          </div>
          {/* <div>현재 남은 포인트: </div> */}
        </S.Point>
      </S.Left>
      <S.Right>
        <S.PickListTitle>찜한 상품</S.PickListTitle>
        <S.ListWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.loadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.pickedData?.fetchUseditemsIPicked.map((el, index) => (
              <S.List key={el._id}>
                {el.images[0] ? (
                  <img
                    // key={el.images}
                    src={`https://storage.googleapis.com/${el.images[0]}`}
                    style={{ width: 160, height: 160, cursor: "pointer" }}
                    onClick={props.onClickItem}
                  />
                ) : (
                  <img
                    src="/noimg.png"
                    style={{ width: 160, height: 160, cursor: "pointer" }}
                    onClick={props.onClickItem}
                  />
                )}
                <S.ListBody>
                  <S.Name id={el._id} onClick={props.onClickItem}>
                    {/* {el.name
                      .replaceAll(props.keyword, `#$%${props.keyword}#$%`)
                      .split("#$%")
                      .map((el) => (
                        <div key={uuidv4()} isMatched={props.keyword === el}>
                          {el}
                        </div>
                      ))} */}
                    {el.name}
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
                  <S.Price onClick={props.onClickItem}>{el.price}원</S.Price>
                </S.PriceWrapper>
              </S.List>
            ))}
          </InfiniteScroll>
        </S.ListWrapper>
      </S.Right>
    </S.Wrapper>
  );
}
