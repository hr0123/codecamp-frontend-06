import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// declare const window: typeof globalThis & {
//   IMP: any;
// };

export default function QuizPaymentLoadingPage() {
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const onClickAmountOne = () => {
    setAmount(500);
  };
  const onClickAmountTwo = () => {
    setAmount(1000);
  };
  const onClickAmountThree = () => {
    setAmount(2000);
  };
  const onClickAmountFour = () => {
    setAmount(5000);
  };

  const requestPay = () => {
    //📌STEP2 결제 준비하기
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp82632123");

    //📌STEP3 결제 요청하기
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card", //가상계좌 결제면 vbank
        // merchant_uid: "ORD20180131-0000011",  //주석하면 알고리즘에의해 랜덤으로 생성됨
        // name: "노르웨이 회전 의자",
        amount: amount,
        // buyer_email: "gildong@gmail.com",
        // buyer_name: "홍길동",
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/quiz06/payment/loading",
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);
          // 백엔드에 결제관련 데이터 넘겨주기(즉,mutation실행_ex.createPointTransactionOfLoading)
          router.push("/quiz06/payment/complete");
        } else {
          // 결제 실패 시 로직
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  return (
    <div>
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
      <button onClick={onClickAmountOne}>500원</button>
      <button onClick={onClickAmountTwo}>1000원</button>
      <button onClick={onClickAmountThree}>2000원</button>
      <button onClick={onClickAmountFour}>5000원</button>
      <button onClick={requestPay}>충전하기</button>
    </div>
  );
}
