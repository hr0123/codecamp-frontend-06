import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// import {
//   IQuery,
//   IQueryFetchUseditemQuestionAnswersArgs,
// } from "../../../../commons/types/generated/types";
import ProductAnswerListUI from "./productAnswerList.presenter";
import { FETCH_USEDITEM_QUESTION_ANSWERS } from "./productAnswerList.queries";

export default function ProductAnswerList(props) {
  const router = useRouter();

  // const { data, fetchMore } = useQuery<
  //   Pick<IQuery, "fetchUseditemQuestionAnswers">,
  //   IQueryFetchUseditemQuestionAnswersArgs
  // >(FETCH_USEDITEM_QUESTION_ANSWERS, {
  //   variables: { useditemQuestionId: String(router.query.productId) },
  // });
  const { data, fetchMore } = useQuery(FETCH_USEDITEM_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: String(router.query.useditemQuestionId) },
  });

  const loadMore = () => {
    // 1.fetchUseditemQuestionAnswers없으면, More로직 중단
    if (!data) return;
    // 2.답변 더 조회하기
    fetchMore({
      // 답변 전체갯수를 10(한page당 질문 수)로 나누고, 올리고, +1(소숫점아래 포함 위해)
      variables: {
        page: Math.ceil(data.fetchUseditemQuestionAnswers.length / 10) + 1,
      },
      // prev(fetchUseditemQuestionAnswers의 useQuery)를 수정 -> 2가지 케이스
      updateQuery: (prev, { fetchMoreResult }) => {
        // 2-(1)더조회할 답변 없으면->기존 답변 보여주기
        if (!fetchMoreResult?.fetchUseditemQuestionAnswers)
          return {
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
          };
        // 2-(2)더조회할 답변 있으면->기존 답변+더조회 결과
        return {
          fetchUseditemQuestionAnswers: [
            ...prev.fetchUseditemQuestionAnswers,
            ...fetchMoreResult.fetchUseditemQuestionAnswers,
          ],
        };
      },
    });
  };

  return <ProductAnswerListUI data={data} loadMore={loadMore} />;
}
