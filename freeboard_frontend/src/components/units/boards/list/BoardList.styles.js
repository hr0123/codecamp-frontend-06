import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
`;
export const Top = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;
export const SearchImage = styled.img`
  position: relative;
  left: 50px;
`;
export const SearchBox = styled.input`
  width: 776px;
  padding: 14px 19px 14px 40px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
`;
export const SearchDate = styled.input`
  width: 244px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 14px 16px 14px 16px;
  font-size: 16px;
  color: #bdbdbd;
`;
export const SearchButton = styled.button`
  width: 99px;
  height: 52px;
  background-color: black;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  padding: 14px 14px 14px 14px;
  cursor: pointer;
`;
export const List = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  // align-items:space-between;
  margin-bottom: 57px;
`;
export const ListRow = styled.tr`
  width: 1200px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 11px 63px 12px 20px;
  border-top: 1px solid #bdbdbd;
  border-bottom: 0.5px solid #bdbdbd;
`;
export const ListHead1 = styled.th`
  width: 5%;
`;
export const ListHead2 = styled.th`
  width: 60%;
`;
export const ListHead3 = styled.th`
  width: 25%;
`;
export const ListHead4 = styled.th`
  width: 10%;
`;

export const ListIndex = styled.td`
  width: 5%;
  text-align: center;
  font-size: 16px;
`;
export const ListWriter = styled.td`
  width: 25%;
  text-align: center;
  font-size: 16px;
`;
export const ListDate = styled.td`
  width: 10%;
  text-align: center;
  font-size: 16px;
`;

export const ListTitle = styled.td`
  width: 60%;
  text-align: center;
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;
export const PageNumber = styled.div`
  width: 111px;
  margin-left: 544px;
  margin-right: 373px;
`;
export const PostButton = styled.button`
  width: 171px;
  height: 52px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  padding: 14px 9px 14px 30px;
  cursor: pointer;
`;
export const PostImage = styled.img`
  position: relative;
  left: 30px;
`;
