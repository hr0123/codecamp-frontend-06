import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductsDetailUI from "./ProductsDetail.presenter";
import {
  FETCH_USED_ITEM,
  DELETE_USED_ITEM,
  CREATE_POINT_TRANSACTION_OF_LOADING,
  // CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING,
} from "./ProductsDetail.queries";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function ProductsDetail() {
  const router = useRouter();

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM);
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );
  // const [createPointTransactionOfBuyingAndSelling] = useMutation(
  //   CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING
  // );

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.productId },
  });

  const onClickMoveToEdit = () => {
    router.push(`/products/${router.query.productId}/edit`);
  };

  const onClickDelete = () => {
    deleteUseditem({
      variables: { useditemId: router.query.productId },
    });
    router.push("/products");
  };

  const onClickMoveToList = () => {
    router.push("/products");
  };

  // const [amount, setAmount] = useState(100); //amount뿐만아니라 아래의 다른 항목들도 state로 넣기 가능

  const onClickBuy = () => {
    //📌STEP2 결제 준비하기
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp82632123"); // Example: imp00000000

    //📌STEP3 결제 요청하기
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card", //가상계좌 결제면 vbank
        // merchant_uid: "ORD20180131-0000011",  //주석하면 알고리즘에의해 랜덤으로 생성됨
        name: data?.fetchUseditem?.name,
        amount: data?.fetchUseditem?.price,
        // buyer_email: "gildong@gmail.com",
        // buyer_name: "홍길동",
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
        m_redirect_url: `http://localhost:3000/products/${router.query.productId}`,
      },
      async (rsp: any) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);
          // 백엔드에 결제관련 데이터 넘겨주기(즉,mutation실행_ex.createPointTransactionOfLoading)
          const result = await createPointTransactionOfLoading({
            variables: { impUid: rsp.imp_uid },
          });
          // const result = await createPointTransactionOfBuyingAndSelling({
          //   variables: { useritemId: rsp.imp_uid },
          // });
          console.log(rsp.imp_uid);
          console.log(result);
          router.push("/mypage");
        } else {
          // 결제 실패 시 로직
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  return (
    <ProductsDetailUI
      data={data}
      onClickMoveToList={onClickMoveToList}
      onClickMoveToEdit={onClickMoveToEdit}
      onClickDelete={onClickDelete}
      onClickBuy={onClickBuy}
    />
  );
}
