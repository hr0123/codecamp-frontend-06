import QuizLayoutHeader from "./header/index";
import QuizLayoutBanner from "./banner/index";
import QuizLayoutNavigation from "./navigation/index";
import QuizLayoutSidebar from "./sidebar/index";
import QuizLayoutFooter from "./footer/index";
import styled from "@emotion/styled";
// import { ReactNode } from "react";

const Body = styled.div`
  height: 500px;
`;
const BodyWrapper = styled.div`
  display: flex;
`;
// interface ILayoutProps {
//   children: ReactNode;
// }

export default function QuizLayout(props) {
  return (
    <>
      <QuizLayoutHeader />
      <QuizLayoutBanner />
      <QuizLayoutNavigation />
      <BodyWrapper>
        <QuizLayoutSidebar />
        <Body>{props.children}</Body>
      </BodyWrapper>
      <QuizLayoutFooter />
    </>
  );
}
