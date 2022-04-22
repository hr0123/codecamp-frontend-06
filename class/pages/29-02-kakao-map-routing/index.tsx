import { useRouter } from "next/router";
import Link from "next/link"; //router.push와 같은 역할

export default function KakaoMapPage() {
  const router = useRouter();

  const onClickMoveToMap = () => {
    router.push("/29-03-kakao-map-routed");
  };

  return (
    // 방식1-1: Client Side Rendering
    // <button onClick={onClickMoveToMap}>맵으로 이동하기!!</button>
    // 방식1-2: Client Side Rendering👉router.push했던 부분을 Link태그로 사용(a태그는 눈속임용)(1-1보다 좋은 방법)
    <Link href="/29-03-kakao-map-routed">
      <a>맵으로 이동하기!!</a>
    </Link>
    // 방식2: muti-page application
    // <a href="/29-03-kakao-map-routed">맵으로 이동하기!!</a>
  );
}
