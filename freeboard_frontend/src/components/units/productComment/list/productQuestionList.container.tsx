import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types";
import ProductQuestionListUI from "./productQuestionList.presenter";
import { FETCH_USEDITEM_QUESTIONS } from "./productQuestionList.queries";

export default function ProductQuestionList() {
  const router = useRouter();

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USEDITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.productId) },
  });

  const loadMore = () => {
    // 1.fetchUseditemQuestions없으면, More로직 중단
    if (!data) return;
    // 2.질문 더 조회하기
    fetchMore({
      // 질문 전체갯수를 10(한page당 질문 수)로 나누고, 올리고, +1(소숫점아래 포함 위해)
      variables: {
        page: Math.ceil(data.fetchUseditemQuestions.length / 10) + 1,
      },
      // rev(fetchUseditemQuestions의 useQuery)를 수정 -> 2가지 케이스
      updateQuery: (prev, { fetchMoreResult }) => {
        // 2-(1)더조회할 질문 없으면->기존 질문 보여주기
        if (!fetchMoreResult?.fetchUseditemQuestions)
          return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };
        // 2-(2)더조회할 질문 있으면->기존 질문+더조회 결과
        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  return <ProductQuestionListUI data={data} loadMore={loadMore} />;
}
