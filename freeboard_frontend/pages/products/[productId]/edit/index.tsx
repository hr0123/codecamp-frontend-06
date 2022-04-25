import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductsWrite from "../../../../src/components/units/products/write/ProductsWrite.container";

const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      contents
      price
      remarks
      # tages
      # images
      useditemAddress {
        address
        lat
        lng
        addressDetail
      }
    }
  }
`;
export default function EditProductPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.productId },
  });
  return <ProductsWrite isEdit={true} data={data} />;
}
