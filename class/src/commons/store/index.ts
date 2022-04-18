// 글로벌스테이트 만들기
import { atom } from "recoil";

export const isEditState = atom({
  key: "isEditState",
  // 초기값
  default: false,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    email: "",
    name: "",
  },
});

// 직전에 위치했던 페이지를 계속 여기에 담아서->사용
export const visitedPageState = atom({
  key: "visitedPageState",
  default: "/",
});
