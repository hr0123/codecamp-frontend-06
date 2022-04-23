import ProductListUI from "./ProductsList.presenter";
import { FETCH_USED_ITEMS } from "./ProductsList.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import _ from "lodash";
import { getDate } from "../../../../commons/libraries/utils";

export default function ProductList() {
  const router = useRouter();

  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS);

  // 검색1
  const [keyword, setKeyword] = useState("");
  // 검색2
  const getDebounce = _.debounce((data) => {
    // 0.2초간 재발(입력) 안할 시 실행시킬 로직
    refetch({ search: data, page: 1 });
    setKeyword(data);
  }, 200);
  // 검색3
  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

  const [basketItems, setBasketItems] = useState([]);

  const onClickItem = (el) => () => {
    // if (event.target instanceof Element)
    //   router.push(`/products/${event.currentTarget.id}`);
    router.push(`/products/${el._id}`);
    // 1.기존 장바구니 가져오기
    const baskets = JSON.parse(
      localStorage.getItem(getDate(new Date())) || "[]"
    );
    // 2.중복 확인
    const temp = baskets.filter((basketEl) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담은 게시물입니다");
      return;
    }
    // 3.장바구니(baskets로컬스토리지)에 담기
    baskets.push(el);
    localStorage.setItem(getDate(new Date()), JSON.stringify(baskets));
  };

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem(getDate(new Date())));
    setBasketItems(baskets);
  }, []);

  const onClickTodayItem = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element)
      router.push(`/products/${event.target.id}`);
  };

  const loadMore = () => {
    // 1.fetchUseditems없으면, More로직 중단
    if (!data) return;
    // 2.더 조회하기
    fetchMore({
      // 상품 전체갯수를 10(한page당 글 수)로 나누고, 올리고, +1(소숫점아래 포함 위해)
      variables: { page: Math.ceil(data.fetchUseditems.length / 10) + 1 },
      // rev(fetchUseditems의 useQuery)를 수정 -> 2가지 케이스
      updateQuery: (prev, { fetchMoreResult }) => {
        // 2-(1)더조회할 상품 없으면->기존 상품 보여주기
        if (!fetchMoreResult?.fetchUseditems)
          return { fetchUseditems: [...prev.fetchUseditems] };
        // 2-(2)더조회할 상품 있으면->기존 상품+더조회 결과
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  const onClickMoveToPost = () => {
    router.push("/products/new");
  };

  return (
    <ProductListUI
      data={data}
      onChangeSearch={onChangeSearch}
      onClickItem={onClickItem}
      loadMore={loadMore}
      basketItems={basketItems}
      onClickTodayItem={onClickTodayItem}
      onClickMoveToPost={onClickMoveToPost}
    />
  );
}
