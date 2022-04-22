// import {
//   IMutation,
//   IMutationCreateBoardCommentArgs,
//   IMutationUpdateBoardCommentArgs,
// } from "../../../../commons/types/generated/types";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react"; //📌ChangeEvent??
import ProductQuestionWriteUI from "./productQuestionWrite.presenter";
import {
  CREATE_USEDITEM_QUESTION,
  UPDATE_USEDITEM_QUESTION,
} from "./productQuestionWrite.queries";
import { FETCH_USEDITEM_QUESTIONS } from "../list/productQuestionList.queries";
import { Modal } from "antd";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionArgs,
} from "../../../../commons/types/generated/types";

export default function ProductQuestionWrite(props) {
  const [questionContents, setQuestionContents] = useState("");
  const router = useRouter();

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USEDITEM_QUESTION);

  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USEDITEM_QUESTION);

  const onChangeQuestionContents = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionContents(event.target.value);
  };

  //질문등록버튼
  const onClickQuestionPost = async () => {
    try {
      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: { contents: questionContents },
          useditemId: String(router.query.productId),
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: { useditemId: router.query.productId },
          },
        ],
      });
      setQuestionContents("");
      // Modal.success({ content: "질문이 성공적으로 등록되었습니다." });
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  //질문수정버튼
  const onClickQuestionEdit = async () => {
    if (!questionContents) {
      Modal.error({ content: "내용이 수정되지 않았습니다." });
      return;
    }
    try {
      // 수정할 질문 없으면 수정 안함
      if (!props.el?._id) return;
      // const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      // if (contents) updateBoardCommentInput.contents = contents;
      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: { contents: questionContents },
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: { useditemId: router.query.productId },
          },
        ],
      });
      props.setIsEdit?.(false);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <ProductQuestionWriteUI
      questionContents={questionContents}
      onChangeQuestionContents={onChangeQuestionContents}
      onClickQuestionPost={onClickQuestionPost}
      onClickQuestionEdit={onClickQuestionEdit}
    />
  );
}
