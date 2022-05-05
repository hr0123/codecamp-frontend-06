import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const Pofile = styled.img`
  width: 80px;
  height: 80px;
`;

export const Point = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: space-between;
`;

export const AmountInput = styled.input`
  width: 180px;
`;
export const Right = styled.div`
  width: 100%;
`;
export const PickListTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const ListWrapper = styled.div`
  overflow: auto;
  width: 100%;
  height: 1000px;
  /* padding: 40px; */
  margin: 40px;
`;
export const List = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  border-top: 1px solid #bdbdbd;
  /* border-bottom: 1px solid #bdbdbd; */
  /* cursor: pointer; */
`;
export const ListBody = styled.div`
  width: 850px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const Remarks = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const Tags = styled.div`
  color: #bdbdbd;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const SellerCountWrapper = styled.div`
  width: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
export const Seller = styled.div`
  /* margin-left: 5px; */
  margin-right: 25px;
`;
export const PriceWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  /* text-align: right; */
`;
export const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  /* text-align: right; */
  cursor: pointer;
`;
