import ProductQuestionWrite from "../../../src/components/units/productComment/write/productQuestionWrite.container";
import ProductsDetail from "../../../src/components/units/products/detail/ProductsDetail.container";
import ProductQuestionList from "../../../src/components/units/productComment/list/productQuestionList.container";

export default function ProductsDetailPage() {
  return (
    <>
      <ProductsDetail />
      <ProductQuestionWrite />
      <ProductQuestionList />
    </>
  );
}
