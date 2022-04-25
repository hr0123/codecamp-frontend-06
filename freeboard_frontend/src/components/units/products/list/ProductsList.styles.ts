import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Body = styled.div``;
export const ListWrapper = styled.div`
  overflow: auto;
  width: 1200px;
  height: 1000px;
`;
export const List = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const Today = styled.div`
  width: 196px;
  border: 1px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;
export const TodayTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const TodayWrapper = styled.div`
  width: 156px;
  height: 199px;
  border: 1px solid #bdbdbd;
  text-align: left;
  padding-left: 7px;
  margin-bottom: 20px;
`;
export const TodayPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
