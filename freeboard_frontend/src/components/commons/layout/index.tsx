import Header from "./header/index";
import Banner from "./banner/index";
import Navigaion from "./navigation/index";
// import Footer from "./footer/index";
import styled from "@emotion/styled";
import { ReactNode } from "react";

// const Wrapper = styled.div`
//   width: 100%;
// `;
const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Header />
      <Banner />
      <Navigaion />
      <Body>{props.children}</Body>
      {/* <Footer /> */}
    </>
  );
}
