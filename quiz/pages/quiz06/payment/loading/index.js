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
    //๐STEP2 ๊ฒฐ์  ์ค๋นํ๊ธฐ
    const IMP = window.IMP; // ์๋ต ๊ฐ๋ฅ
    IMP.init("imp82632123");

    //๐STEP3 ๊ฒฐ์  ์์ฒญํ๊ธฐ
    // IMP.request_pay(param, callback) ๊ฒฐ์ ์ฐฝ ํธ์ถ
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card", //๊ฐ์๊ณ์ข ๊ฒฐ์ ๋ฉด vbank
        // merchant_uid: "ORD20180131-0000011",  //์ฃผ์ํ๋ฉด ์๊ณ ๋ฆฌ์ฆ์์ํด ๋๋ค์ผ๋ก ์์ฑ๋จ
        // name: "๋ธ๋ฅด์จ์ด ํ์  ์์",
        amount: amount,
        // buyer_email: "gildong@gmail.com",
        // buyer_name: "ํ๊ธธ๋",
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "์์ธํน๋ณ์ ๊ฐ๋จ๊ตฌ ์ ์ฌ๋",
        // buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/quiz06/payment/loading",
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // ๊ฒฐ์  ์ฑ๊ณต ์ ๋ก์ง
          console.log(rsp);
          // ๋ฐฑ์๋์ ๊ฒฐ์ ๊ด๋ จ ๋ฐ์ดํฐ ๋๊ฒจ์ฃผ๊ธฐ(์ฆ,mutation์คํ_ex.createPointTransactionOfLoading)
          router.push("/quiz06/payment/complete");
        } else {
          // ๊ฒฐ์  ์คํจ ์ ๋ก์ง
          alert("๊ฒฐ์ ์ ์คํจํ์ต๋๋ค! ๋ค์ ์๋ํด ์ฃผ์ธ์!");
        }
      }
    );
  };

  return (
    <div>
      {/* ๐STEP1 ์์ํฌํธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ถ๊ฐํ๊ธฐ */}
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
      <button onClick={onClickAmountOne}>500์</button>
      <button onClick={onClickAmountTwo}>1000์</button>
      <button onClick={onClickAmountThree}>2000์</button>
      <button onClick={onClickAmountFour}>5000์</button>
      <button onClick={requestPay}>์ถฉ์ ํ๊ธฐ</button>
    </div>
  );
}
