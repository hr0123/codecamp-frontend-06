import InfiniteScroll from "react-infinite-scroller";
import ProductQuestionListUIItem from "./productQuestionList.presenterItem";

export default function ProductQuestionListUI(props) {
  return (
    <>
      <InfiniteScroll pageStart={0} loadMore={props.loadMore} hasMore={true}>
        {props.data?.fetchUseditemQuestions.map((el) => (
          // UIItem에 map함수부분 빼고, props로 el넘겨주고, import
          <ProductQuestionListUIItem key={el._id} el={el} data={props.data} />
        )) || <div></div>}
      </InfiniteScroll>
    </>
  );
}
