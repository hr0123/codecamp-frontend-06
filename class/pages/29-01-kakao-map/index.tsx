import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668" //내 어플리케이션 JavaScript 키
        ></script>
      </Head>
      {/* 👇body부분에 script쓸때 사용하는 부분 */}
      <Script src="" />
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </div>
  );
}
