import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
} from "../../../../commons/types/generated/types";
import ProductAnswerList from "../list/productAnswerList.containter";
import { FETCH_USEDITEM_QUESTION_ANSWERS } from "../list/productAnswerList.queries";
import ProductAnswerWriteUI from "./productAnswerWrite.presenter";
import { CREATE_USEDITEM_QUESTION_ANSWER } from "./productAnswerWrite.queries";

export default function ProductAnswerWrite(props) {
  const router = useRouter();
  const [answerContents, setAnswerContents] = useState("");

  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USEDITEM_QUESTION_ANSWER);

  const onChangeAnswerContents = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerContents(event.target.value);
  };

  const onClickAnswerPost = async () => {
    try {
      let result = await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: { contents: answerContents },
          useditemQuestionId: props.el._id,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: props.el._id },
          },
        ],
      });
      console.log(result);
      setAnswerContents("");
      // props.setIsAnswer(false);
      Modal.success({ content: "답변이 성공적으로 등록되었습니다." });
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <ProductAnswerWriteUI
      answerContents={answerContents}
      onChangeAnswerContents={onChangeAnswerContents}
      onClickAnswerPost={onClickAnswerPost}
      isAnswer={props.isAnswer}
    />
  );
}
