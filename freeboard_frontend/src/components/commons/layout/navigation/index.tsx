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
  { name: "💌게시판", page: "/boards" },
  { name: "✒글쓰기", page: "/boards/new" },
  { name: "⚽스포츠", page: "/openapi" },
  { name: "💬FireBase", page: "/firebase/new" },
  { name: "🚀Login", page: "/login" },
  { name: "💕회원가입", page: "/signup" },
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
