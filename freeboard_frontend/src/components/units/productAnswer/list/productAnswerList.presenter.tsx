import InfiniteScroll from "react-infinite-scroller";
import ProductAnswerListUIItem from "./productAnswerList.presenterItem";

export default function ProductAnswerListUI(props) {
  return (
    <>
      <InfiniteScroll pageStart={0} loadMore={props.loadMore} hasMore={true}>
        {props.data?.fetchUseditemQuestionAnswers.map((el) => (
          // UIItem에 map함수부분 빼고, props로 el넘겨주고, import
          <ProductAnswerListUIItem key={el._id} el={el} data={props.data} />
        )) || <div></div>}
      </InfiniteScroll>
    </>
  );
}
