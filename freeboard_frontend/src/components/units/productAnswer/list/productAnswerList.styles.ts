//댓글_조회_스타일즈
import styled from "@emotion/styled";
import { Rate } from "antd";
// import { Modal } from "antd";

export const PasswordInput = styled.input``;
export const CommentFetch = styled.div`
  width: 1200px;
  margin: 0px 100px;
  height: 150px;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;
export const CommentFetchImg = styled.img`
  width: 40px;
  height: 40px;
`;
export const CommentFetchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const CommentFetchTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CommentFetchTopLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CommentFetchWriter = styled.div`
  /* width: 1080px; */
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: left;
  margin-left: 15px;
  margin-right: 18px;
`;
export const CommentFetchRating = styled(Rate)``;
export const CommentFetchTopRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CommentEditButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;
export const CommentEdit = styled.img``;
export const CommentDeleteButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;
export const CommentDelete = styled.img``;
export const CommentFetchContents = styled.div`
  width: 100%;
  font-size: 16px;
  color: #4f4f4f;
  text-align: left;
  padding: 15px;
`;
export const CommentFetchDate = styled.div`
  width: 100%;
  height: 18px;
  font-size: 12px;
  color: #bdbdbd;
  padding-left: 15px;
`;
