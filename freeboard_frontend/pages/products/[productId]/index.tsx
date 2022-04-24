import ProductQuestionWrite from "../../../src/components/units/productComment/write/productQuestionWrite.container";
import ProductsDetail from "../../../src/components/units/products/detail/ProductsDetail.container";
import ProductQuestionList from "../../../src/components/units/productComment/list/productQuestionList.container";
import ProductAnswerWrite from "../../../src/components/units/productAnswer/write/productAnswerWrite.containter";
import ProductAnswerList from "../../../src/components/units/productAnswer/list/productAnswerList.containter";

export default function ProductsDetailPage() {
  return (
    <>
      <ProductsDetail />
      <ProductQuestionWrite />
      <ProductQuestionList />
      <ProductAnswerWrite />
      <ProductAnswerList />
    </>
  );
}
