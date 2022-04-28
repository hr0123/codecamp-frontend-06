import * as S from "./mypage.styles";
import Head from "next/head";
import { getDate } from "../../../commons/libraries/utils";

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
      <S.Right></S.Right>
    </S.Wrapper>
  );
}
