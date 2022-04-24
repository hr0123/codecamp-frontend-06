import styled from "@emotion/styled";
import { Rate } from "antd";

export const CommentWrapper = styled.div`
  width: 1200px;
  margin: 0px 100px;
`;
export const CommentPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;
export const CommentHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CommentHeadImg = styled.img`
  margin-right: 14px;
  padding-top: 5px;
`;
export const CommentHeadTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-top: 40px;
  padding-bottom: 40px;
`;
// export const CommentPostTop = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;
// export const CommentWriter = styled.input`
//   width: 180px;
//   height: 52px;
//   border: 1px solid #bdbdbd;
//   font-size: 16px;
//   color: #828282;
//   text-align: left;
//   padding-left: 20px;
//   padding-top: 14px;
//   padding-bottom: 14px;
// `;
// export const CommentPassword = styled.input`
//   width: 180px;
//   height: 52px;
//   border: 1px solid #bdbdbd;
//   font-size: 16px;
//   color: #828282;
//   text-align: left;
//   padding-left: 20px;
//   padding-top: 14px;
//   padding-bottom: 14px;
//   margin-left: 24px;
//   margin-right: 26px;
// `;
// export const Rating = styled(Rate)``;
export const CommentPostBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;
export const CommentContents = styled.input`
  width: 1200px;
  height: 108px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  color: #bdbdbd;
  /* padding: 20px; */
  padding: 20px 20px 64px 20px;
  margin-top: 20px;
`;
export const CommentPostButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-right: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  border-left: 1px solid #bdbdbd;
  width: 1200px;
  height: 52px;
  margin-bottom: 60px;
`;
export const ContentsLength = styled.div`
  width: 100px;
  padding-right: 1082px;
  padding-left: 20px;
  font-size: 16px;
  color: #bdbdbd;
`;
export const CommentPostButton = styled.button`
  width: 96px;
  height: 52px;
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 14px 11px 14px 11px;
  cursor: pointer;
`;
