import styled from "@emotion/styled";

export const Wrapper = styled.div`
  /* width: 100px; */
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Head = styled.div`
  color: gray;
  font-size: 30px;
  font-weight: bold;
`;
export const Input = styled.input`
  width: 384px;
  height: 64px;
  border: 1px solid pink;
  border-radius: 16px;
  color: pink;
  font-size: 16px;
  padding-left: 20px;
`;
export const CheckWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const KeepLoginCheck = styled.img`
  width: 20px;
  height: 20px;
  color: pink;
`;
export const KeepLogin = styled.div`
  font-size: 16px;
  color: gray;
`;
export const LoginButton = styled.button`
  width: 384px;
  height: 64px;
  border: 1px solid pink;
  border-radius: 16px;
  background-color: pink;
  color: white;
  font-size: 16px;
  text-align: center;
`;
export const BottomWrapper = styled.div`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const BottomButton = styled.div`
  font-size: 14px;
  color: pink;
`;
