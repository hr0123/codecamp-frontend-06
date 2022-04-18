import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../src/commons/store";

export function useMoveToPage() {
  const router = useRouter();

  // 직전에 위치했던 페이지를 글로벌스테이트에 담아서 import->path를 담아->이동
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path) => () => {
    setVisitedPage(path);
    router.push(path);
  };

  return {
    visitedPage,
    onClickMoveToPage,
  };
}
