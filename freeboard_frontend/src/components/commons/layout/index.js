import Header from "./header/index";
import Banner from "./banner/index";
import Navigaion from "./navigation/index";
import Footer from "./footer/index";
import styled from "@emotion/styled";

const Body = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Layout(props) {
  return (
    <>
      <Header />
      <Banner />
      <Navigaion />
      <Body>{props.children}</Body>
      <Footer />
    </>
  );
}
