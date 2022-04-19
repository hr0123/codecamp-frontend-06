// 26-06 복사해옴
// localStorage.getItem() -> basketItems.map

// import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IBoard } from "../../src/commons/types/generated/types";

const MyRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const MyColumn = styled.div`
  width: 25%;
`;

export default function BasketPage() {
  const [basketItems, setBasketItems] = useState([]);

  // useEffect 안쓰면 => "로컬스토리지 is not defined" 오류뜸 
  // (프리렌더링 시점에서는 useEffect 실행안되므로, 
  // 프리렌더링 이후 브라우저 아닌 서버에서만 실행되도록 useEffect안에서 실행)
  useEffect(() => {
    // 객체나 배열 형태로
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, []);

  return (
    <div>
      {basketItems.map((el: IBoard) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
        </MyRow>
      ))}
    </div>
  );
}
