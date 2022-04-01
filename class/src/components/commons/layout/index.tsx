import LayoutHeader from "../layout/header/index";
import LayoutBanner from "../layout/banner/index";
import LayoutNavigation from "../layout/navigation/index";
import LayoutFooter from "../layout/footer/index";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { useRouter } from "next/router";

const Body = styled.div`
  height: 500px;
`;
const LayoutSidebar = styled.div`
  width: 100px;
  height: 500px;
  background-color: orange;
`;
const BodyWrapper = styled.div`
  display: flex;
`;

//특정 페이지에서 특정 레이아웃 안보이게 하기
const HIDDEN_HEADERS = [
  "/12-05-modal-refactoring",
  // ...
  // ...
  // ...
];

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  // console.log(router);
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <>
      {/* 현재주소 아니고 다른 주소면 => LayoutHeader 보이게 하기 */}
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <BodyWrapper>
        <LayoutSidebar>여기는 사이드바 입니다</LayoutSidebar>
        <Body>{props.children}</Body>
      </BodyWrapper>
      <LayoutFooter />
    </>
  );
}
