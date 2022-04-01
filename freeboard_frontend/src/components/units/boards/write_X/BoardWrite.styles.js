import styled from "@emotion/styled";

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  // align-items:center; //★화면에 세로중앙 어떻게?
`;
export const Wrapper = styled.div`
  width: 1200px;
  height: 1847px;
  border: 1px solid #ffffff;
  box-shadow: 7px 7px 39px rgba(0, 0, 0, 0.2);
  padding-top: 60px;
  padding-right: 100px;
  padding-left: 100px;
`;
export const Head = styled.div`
  height: 53px;
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 100px;
  padding-left: 400px;
  padding-right: 400px;
`;
export const Wrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Body1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 16px;
`;
export const Half = styled.input`
  border: 1px solid #bdbdbd;
  width: 486px;
  height: 52px;
  color: gray;
  font-size: 16px;
  padding: 10px 0px 10px 16px;
  margin-bottom: 40px;
`;
export const Long = styled.input`
  border: 1px solid #bdbdbd;
  width: 996px;
  height: 52px;
  color: gray;
  font-size: 16px;
  padding: 10px 0px 10px 16px;
  margin-bottom: 40px;
`;
export const Big = styled.input`
  border: 1px solid #bdbdbd;
  width: 996px;
  height: 480px;
  color: gray;
  font-size: 16px;
  padding: 10px 0px 440px 16px;
  margin-bottom: 40px;
`;
export const Address = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Short = styled.div`
  border: 1px solid #bdbdbd;
  width: 77px;
  height: 52px;
  color: gray;
  font-size: 16px;
  padding: 12px 14px 10px 14px;
`;
export const SearchButton = styled.button`
  background-color: black;
  width: 130px;
  height: 52px;
  color: white;
  font-size: 16px;
  padding: 12px 12px 10px 12px;
  margin-left: 16px;
  margin-bottom: 16px;
`;
export const WrapperImage = styled.div``;
export const Image = styled.img`
  margin-bottom: 40px;
  margin-right: 24px;
`;
export const Select = styled.div``;
export const Select1 = styled.input``;
export const Select2 = styled.input``;
export const SignupButton = styled.button`
  width: 180px;
  height: 52px;
  background-color: ${(props) => (props.isActive ? "yellow" : "none")};
  border: 1px solid #ffd600;
  margin: 82px 400px 100px 400px;
  font-size: 16px;
  font-weight: bold;
`;
