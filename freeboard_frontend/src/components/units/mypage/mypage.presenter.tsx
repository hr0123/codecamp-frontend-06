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
          {/*ðSTEP1.ììí¬í¸ ë¼ì´ë¸ë¬ë¦¬ ì¶ê°íê¸° */}
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
            placeholder="ì¶©ì í  ê¸ì¡ì ìë ¥í´ì£¼ì¸ì"
            onChange={props.onChangeCreatePointAmount}
          />
          <button onClick={props.onClickCreatePoint}>í¬ì¸í¸ ì¶©ì </button>
          <div>
            {/* ì¶©ì ìë£ í¬ì¸í¸: */}
            {/* {props.data?.fetchPointTransactionsOfLoading.amount} */}
            íì¬ í¬ì¸í¸:
            {props.data?.fetchUserLoggedIn.userPoint.amount}
          </div>
          <div>
            ê¸°ì¤ì¼ì:
            {/* {props.data?.fetchPointTransactionsOfLoading.createdAt} */}
            {/* {props.data?.fetchUserLoggedIn.userPoint.createdAt} */}
            {props.data?.fetchUserLoggedIn.userPoint.updatedAt}
            {/* âìë¨ */}
          </div>
          {/* <div>íì¬ ë¨ì í¬ì¸í¸: </div> */}
        </S.Point>
      </S.Left>
      <S.Right>
        <S.PickListTitle>ì°í ìí</S.PickListTitle>
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
                  <S.Price onClick={props.onClickItem}>{el.price}ì</S.Price>
                </S.PriceWrapper>
              </S.List>
            ))}
          </InfiniteScroll>
        </S.ListWrapper>
      </S.Right>
    </S.Wrapper>
  );
}
