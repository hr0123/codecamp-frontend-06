import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductsDetailUI from "./ProductsDetail.presenter";
import {
  FETCH_USED_ITEM,
  DELETE_USED_ITEM,
  // CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING,
} from "./ProductsDetail.queries";

export default function ProductsDetail() {
  const router = useRouter();

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM);
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

  const onClickBuy = () => {};

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
