import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductsDetailUI from "./ProductsDetail.presenter";
import { FETCH_USED_ITEM } from "./ProductsDetail.queries";

export default function ProductsDetail() {
  const router = useRouter();

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.productId },
  });
  console.log(data);

  const onClickMoveToList = () => {
    router.push("/products");
  };

  const onClickMoveToEdit = () => {
    router.push(`/products/${router.query.productId}/edit`);
  };

  return (
    <ProductsDetailUI
      data={data}
      onClickMoveToList={onClickMoveToList}
      onClickMoveToEdit={onClickMoveToEdit}
    />
  );
}
