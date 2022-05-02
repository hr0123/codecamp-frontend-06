import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Body = styled.div`
  width: 1200px;
  margin-right: 40px;
`;
export const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  padding-left: 70px;
`;
export const Search = styled.input`
  width: 350px;
  height: 52px;
  border: 5px solid pink;
  border-radius: 50px;
  background-color: white;
  padding-left: 16px;
  margin-left: 360px;
`;
export const Button = styled.div`
  width: 130px;
  height: 52px;
  border: pink;
  background-color: pink;
  color: white;
  border-radius: 70px;
  text-align: center;
  padding: 13px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
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
export const PostButton = styled.div`
  width: 130px;
  height: 52px;
  border: pink;
  background-color: pink;
  color: white;
  border-radius: 70px;
  text-align: center;
  padding: 13px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  left: 1080px;
`;
export const Today = styled.div`
  width: 196px;
  border: 1px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  margin-top: 130px;
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
  /* height: 199px; */
  border: 1px solid #bdbdbd;
  text-align: left;
  padding-left: 7px;
  margin-bottom: 20px;
  padding: 10px;
`;
export const TodayPickWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  margin-bottom: 4px;
`;
export const TodayPick = styled.div`
  font-size: 12px;
  margin-left: 5px;
`;
export const TodayImage = styled.img`
  margin: 0px 40px 12px 40px;
`;
export const TodayName = styled.div`
  width: 127px;
  height: 18px;
  font-size: 12px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;
export const TodayRemarks = styled.div`
  height: 18px;
  font-size: 12px;
  color: #4f4f4f;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;
export const TodayPrice = styled.div`
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 4px;
  cursor: pointer;
`;
export const TodayTags = styled.div`
  height: 15px;
  font-size: 10px;
  color: #bdbdbd;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
