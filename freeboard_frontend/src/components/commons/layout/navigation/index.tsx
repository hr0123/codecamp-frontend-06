import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { MouseEvent } from "react";

const Wrapper = styled.div`
  height: 80px;
  background-color: #f0fff0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const MenuMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
`;
const Menus = styled.div`
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
`;

const NAVIGATION_MENUS = [
  { name: "๐๊ฒ์ํ", page: "/boards" },
  { name: "โ๊ธ์ฐ๊ธฐ", page: "/boards/new" },
  { name: "๐์ค๊ณ ๋ง์ผ", page: "/products" },
  { name: "โ์ํ๋ฑ๋ก", page: "/products/new" },
  { name: "โฝ์คํฌ์ธ ", page: "/openapi" },
  { name: "๐ฌFireBase", page: "/firebase/new" },
  { name: "๐ทMyPage", page: "/mypage" },
  { name: "๐Login", page: "/login" },
  { name: "๐ํ์๊ฐ์", page: "/signup" },
];

// interface INavigaion {
//   onClickMenu = (event: MouseEvent<HTMLDivElement>) => void
// }

export default function Navigaion() {
  const router = useRouter();

  const onClickMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element) router.push(event.target.id);
  };

  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <MenuMap key={el.page}>
          <Menus id={el.page} onClick={onClickMenu}>
            {el.name}
          </Menus>
        </MenuMap>
      ))}
    </Wrapper>
  );
}
