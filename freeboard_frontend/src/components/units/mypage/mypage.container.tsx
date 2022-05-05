import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/store";
import { useAuth } from "../../commons/hooks/useAuth";
import MypageUI from "./mypage.presenter";
import {
  CREATE_POINT_TRANSACTION_OF_LOADING,
  FETCH_USED_ITEMS_I_PICKED,
  // FETCH_POINT_TRANSACTIONS_OF_LOADING,
  FETCH_USER_LOGGEDIN,
} from "./mypage.queries";

declare const window: typeof globalThis & {
  IMP: any;
};

function Mypage() {
  useAuth();
  const [userInfo] = useRecoilState(userInfoState);
  const router = useRouter();
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );
  const { data } = useQuery(FETCH_USER_LOGGEDIN);
  // const { data } = useQuery(FETCH_POINT_TRANSACTIONS_OF_LOADING);
  const { data: pickedData, fetchMore } = useQuery(FETCH_USED_ITEMS_I_PICKED, {
    variables: { search: "", page: 1 },
  });
  const [amount, setAmount] = useState(0); //amount뿐만아니라 아래의 다른 항목들도 state로 넣기 가능

  // console.log(data);

  const onChangeCreatePointAmount = (event) => {
    setAmount(event.target.value);
  };

  const onClickCreatePoint = () => {
    //📌STEP2.결제 준비하기
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp49910675"); // Example: imp00000000
    //📌STEP3.결제 요청하기
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card", //가상계좌 결제면 vbank
        // merchant_uid: "ORD20180131-0000011",  //주석하면 알고리즘에의해 랜덤으로 생성됨
        name: "포인트 충전",
        amount: amount,
        // buyer_email: "gildong@gmail.com",
        // buyer_name: "홍길동",
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/mypage",
        // m_redirect_url: `http://localhost:3000/products/${router.query.productId}`,
      },
      async (rsp: any) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);
          console.log(rsp.imp_uid);
          // 백엔드에 결제관련 데이터 넘겨주기(즉,mutation실행_ex.createPointTransactionOfLoading)
          await createPointTransactionOfLoading({
            variables: { impUid: rsp.imp_uid },
            refetchQueries: [
              {
                query: FETCH_USER_LOGGEDIN,
              },
            ],
          });
          // console.log(rsp.imp_uid);
          // console.log(result);
          // router.push("/mypage");
        } else {
          // 결제 실패 시 로직
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  const loadMore = () => {
    // 1.fetchUseditemsIPicked없으면, More로직 중단
    if (!pickedData) return;
    // 2.더 조회하기
    fetchMore({
      // 상품 전체갯수를 10(한page당 글 수)로 나누고, 올리고, +1(소숫점아래 포함 위해)
      variables: {
        page: Math.ceil(pickedData.fetchUseditemsIPicked.length / 10) + 1,
      },
      // rev(fetchUseditems의 useQuery)를 수정 -> 2가지 케이스
      updateQuery: (prev, { fetchMoreResult }) => {
        // 2-(1)더조회할 상품 없으면->기존 상품 보여주기
        if (!fetchMoreResult?.fetchUseditemsIPicked)
          return { fetchUseditemsIPicked: [...prev.fetchUseditemsIPicked] };
        // 2-(2)더조회할 상품 있으면->기존 상품+더조회 결과
        return {
          fetchUseditemsIPicked: [
            ...prev.fetchUseditemsIPicked,
            ...fetchMoreResult.fetchUseditemsIPicked,
          ],
        };
      },
    });
  };

  const onClickItem = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element)
      router.push(`/products/${event.target.id}`);
  };

  return (
    <MypageUI
      userInfo={userInfo}
      onChangeCreatePointAmount={onChangeCreatePointAmount}
      onClickCreatePoint={onClickCreatePoint}
      data={data}
      pickedData={pickedData}
      loadMore={loadMore}
      onClickItem={onClickItem}
    />
  );
}

export default Mypage;
