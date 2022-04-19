import { useQuery, gql } from "@apollo/client";
import { getDate } from "../../../src/commons/libraries/utils";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  width: 1000px;
  height: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Quiz06TodayPage() {
  const { data } = useQuery(FETCH_BOARDS);

  const [basketItems, setBasketItems] = useState([]);

  const onClickBasket = (el) => () => {
    // 1.기존 장바구니 가져오기
    const baskets = JSON.parse(
      localStorage.getItem(getDate(new Date())) || "[]"
    );
    // 2.중복 확인
    const temp = baskets.filter((basketEl) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담은 게시물입니다");
      return;
    }
    // 3.장바구니(baskets로컬스토리지)에 담기
    baskets.push(el);
    localStorage.setItem(getDate(new Date()), JSON.stringify(baskets));
  };

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem(getDate(new Date())));
    setBasketItems(baskets);
  }, []);

  return (
    <Wrapper>
      <Left>
        {data?.fetchBoards.map((el) => (
          <div key={el._id}>
            <div>{el.writer}</div>
            <div>{el.title}</div>
            <button onClick={onClickBasket(el)}>장바구니담기</button>
          </div>
        ))}
      </Left>
      <Right>
        {basketItems.map((el) => (
          <div key={el._id}>
            <div>{el.writer}</div>
            <div>{el.title}</div>
          </div>
        ))}
      </Right>
    </Wrapper>
  );
}
