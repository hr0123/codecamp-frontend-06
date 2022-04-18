import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductsWrite from "../../../../src/components/units/products/write/ProductsWrite.container";

const FETCH_USED_ITEM = gql`
  query fetchUsedItem($useditemId: ID!) {
    fetchUsedItem(useditemId: $useditemId) {
      _id
      name
      contents
      price
      tages
      images
      # useditemAddress
    }
  }
`;
export default function EditProductPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { productId: router.query.productId },
  });
  return <ProductsWrite isEdit={true} data={data} />;
}
