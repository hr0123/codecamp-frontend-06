import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductsDetailUI from "./ProductsDetail.presenter";
import {
  FETCH_USED_ITEM,
  DELETE_USED_ITEM,
  CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING,
  TOGGLE_USEDITEM_PICK,
  // FETCH_USEDITEMS_COUNT_I_PICKED,
} from "./ProductsDetail.queries";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function ProductsDetail() {
  const router = useRouter();

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM);
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING
  );
  const [toggleUseditemPick] = useMutation(TOGGLE_USEDITEM_PICK);

  // const { data: pickData } = useQuery(FETCH_USEDITEMS_COUNT_I_PICKED);
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

  const onClickBuy = () => {
    const transactionData = createPointTransactionOfBuyingAndSelling({
      variables: { useritemId: router.query.productId },
    });
    console.log(transactionData);
    router.push("/mypage");
  };

  const onClickPick = () => {
    toggleUseditemPick({
      variables: { useditemId: router.query.productId },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM,
          variables: { useditemId: router.query.productId },
        },
      ],
    });
  };

  useEffect(() => {
    // 👇Head안 script태그 넣었던 부분을 직접 만들기
    const script = document.createElement("script"); // <script></script>만들어짐
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668&libraries=services&autoload=false";
    document.head.appendChild(script);
    // 👇script가 로드되면 그때, 기존에있던 아래 로직 실행
    script.onload = () => {
      if (!data?.fetchUseditem) return;
      window.kakao.maps.load(function () {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행
        console.log(data);
        let lat = data?.fetchUseditem?.useditemAddress?.lat;
        let lng = data?.fetchUseditem?.useditemAddress?.lng;
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        // 마커가 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        // 마커를 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커가 지도 위에 표시
        marker.setMap(map);
      });
    };
  }, [data?.fetchUseditem]);

  return (
    <ProductsDetailUI
      data={data}
      onClickMoveToList={onClickMoveToList}
      onClickMoveToEdit={onClickMoveToEdit}
      onClickDelete={onClickDelete}
      onClickBuy={onClickBuy}
      onClickPick={onClickPick}
      // pickData={pickData}
    />
  );
}
