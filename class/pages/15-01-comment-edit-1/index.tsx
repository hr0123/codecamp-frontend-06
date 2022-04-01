//세번째것만 다른 데이터 보여주기
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled"; //한el map을 한행으로 만들기(flex)
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
const MyRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const MyColumn = styled.div`
  width: 25%; //전체 가로의 1/4
`;

export default function MapBoardPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [myIndex, setMyIndex] = useState(-1);

  const onClickEdit = (event) => {
    // 버튼 클릭 시->해당id가 event의 값으로 나오게 됨->state라는 상수에 할당
    setMyIndex(event.target.id);
  };

  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <div key={el._id}>
          {/* 3번째(index 2) 아닐 경우 */}
          {index !== 2 && (
            <MyRow>
              <MyColumn>
                <input type="checkbox" />
              </MyColumn>
              <MyColumn>{el._id}</MyColumn>
              <MyColumn>{el.writer}</MyColumn>
              <MyColumn>{el.title}</MyColumn>
              <button id={index} onClick={onClickEdit}>
                수정
              </button>
            </MyRow>
          )}
          {/* 3번째(index 2) 경우 */}
          {index === setMyIndex && <div>수정하기 화면입니다</div>}
        </div>
      ))}
    </>
  );
}
