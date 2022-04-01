import styled from "@emotion/styled";

// 한el map을 한행으로 만들기(flex)
const MyRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const MyColumn = styled.div`
  /* width: 25%; //전체 가로의 1/4 */
`;

export default function Board(props) {
  return (
    <>
      {props.data?.fetchBoards.map((el) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
        </MyRow>
      ))}
    </>
  );
}
