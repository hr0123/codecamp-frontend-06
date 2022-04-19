import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  cursor: pointer;
`;

export default function Quiz06BoardsPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [isCancel, setIsCancel] = useState(false);

  const onClickBasket = (el) => () => {
    // 1.기존 장바구니 가져오기
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    // 2.중복 확인
    const temp = baskets.filter((basketEl) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담은 게시물입니다");
      setIsCancel(true);
      return;
    }
    // 3-1.장바구니(baskets로컬스토리지)에 담기
    baskets.push(el);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  const onClickCancel = (el) => () => {
    // 3-2.중복 게시물 제외하고 장바구니(baskets로컬스토리지)에 담기(담기취소 버튼이 눌린 데이터를 로컬스토리지에서 제외)
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    const NewBaskets = baskets.filter((basketEl) => basketEl._id !== el._id);
    baskets.push(el);
    localStorage.setItem("baskets", JSON.stringify(NewBaskets));
    setIsCancel(false);
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Wrapper key={el._id}>
          <div>{el.writer}</div>
          <div>{el.title}</div>
          {!isCancel && (
            <Button isCancel={false} onClick={onClickBasket(el)}>
              게시물담기
            </Button>
          )}
          {isCancel && (
            <Button isCancel={true} onClick={onClickCancel(el)}>
              담기취소
            </Button>
          )}
        </Wrapper>
      ))}
    </>
  );
}
