import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1200px;
  /* height: 2009px; */
  border: 1px solid black;
  margin: 100px;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;
export const Head = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-weight: bold;
`;
export const Title = styled.div`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
`;
export const NameInput = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;
export const Error = styled.div`
  width: 100%;
  color: red;
  font-size: 16px;
`;
export const DetailInput = styled.input`
  width: 996px;
  height: 320px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const PriceInput = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;
export const TagInput = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;
export const LocationWrapper = styled.div`
  width: 996px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Map = styled.div`
  width: 384px;
  height: 252px;
  background-color: pink;
`;
export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
`;
export const GpsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const GpsLeft = styled.input`
  width: 108px;
  height: 52px;
  font-size: 16px;
  color: #4f4f4f;
  border: 1px solid #bdbdbd;
  text-align: center;
`;
export const Gps = styled.img`
  width: 15px;
  height: 20px;
  /* margin-left: 21px;
  margin-right: 21px;
  margin-top: 20px; */
  margin: 20px 21px 15px 21px;
`;
export const GpsRight = styled.input`
  width: 108px;
  height: 52px;
  font-size: 16px;
  color: #4f4f4f;
  border: 1px solid #bdbdbd;
  text-align: center;
`;
export const AddressInput = styled.input`
  width: 558px;
  height: 52px;
  border: 1px solid #bdbdbd;
  margin-bottom: 10px;
  padding-left: 16px;
`;
export const ImageWrapper = styled.div`
  width: 996px;
  padding-top: 40px;
`;
export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: 16px;
  margin-bottom: 80px;
`;
export const RadioButton = styled.input`
  cursor: pointer;
`;
export const RadioLabel = styled.label`
  margin-left: 8px;
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;
`;
export const Button = styled.button`
  width: 179px;
  height: 52px;
  background-color: #bdbdbd;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
`;
