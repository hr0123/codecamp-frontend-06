// 07-02 복사해옴
// FETCH_BOARDS로 게시글 목록 불러오기 -> map으로 뿌려주기
// 장바구니 담기 버튼 -> 누르면 localStorage에 해당 아이템 담기(set)
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { IBoard } from "../../src/commons/types/generated/types";

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
const MyRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const MyColumn = styled.div`
  width: 25%;
`;

export default function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS);

  // html은 객체가 못들어옴 => JSON.stringify()했었는데 이럴필요없고 => HOF활용해서 el을 통째로 넘기면됨
  const onClickBasket = (el: IBoard) => () => {
    console.log(el);

    // 1.기존 장바구니 가져오기 : 현재까지의 basket 가져와서->객체나 배열형태로(없으면 빈배열로)->변수에 담음
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");

    // 2.이미 담겼는지 확인하기 : 중복담기 안되게 하기
    const temp = baskets.filter((basketEl: IBoard) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담으신 물품입니다!!");
      //장바구니에서 뺴는 로직 추가 가능(로컬스토리지에서 데이터를 제외시킴)
      // const newBaskets = baskets.filter((basketEl: IBoard) => basketEl._id === el._id)
      // 맨아래 -> localStorage.setItem("baskets", JSON.stringify(newBaskets));
      return;
    }

    // 3.장바구니에 담기 : baskets에 추가하기
    // ↓객체el에서 __typename이라는 키와 해당 밸류 제외한 새 객체 newEl을 넣기
    const { __typename, ...newEl } = el;
    // ↓원본이 삭제되므로 좋은 방법 아님
    // delete el._typename
    // ↓기존 데이터에 추가
    baskets.push(newEl);
    // ↓객체를 텍스트로 바꿔서 넣어줘야해서 JSON.stringify
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  return (
    <div>
      {data?.fetchBoards.map((el: IBoard) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
          <button onClick={onClickBasket(el)}>장바구니담기</button>
        </MyRow>
      ))}
    </div>
  );
}
