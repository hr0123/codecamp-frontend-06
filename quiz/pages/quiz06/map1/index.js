import Script from "next/script";
import { useEffect } from "react";

// declare const window: typeof globalThis & {
//   kakao: any;
// };

export default function QuizMap1Page() {
  useEffect(() => {
    // ๐Head์ scriptํ๊ทธ ๋ฃ์๋ ๋ถ๋ถ์ ์ง์  ๋ง๋ค๊ธฐ
    const script = document.createElement("script"); // <script></script>๋ง๋ค์ด์ง
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668&autoload=false";
    document.head.appendChild(script);
    // ๐script๊ฐ ๋ก๋๋๋ฉด ๊ทธ๋, ๊ธฐ์กด์์๋ ์๋ ๋ก์ง ์คํ
    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // ์ง๋๋ฅผ ๋ด์ ์์ญ์ DOM ๋ ํผ๋ฐ์ค

        const options = {
          // ์ง๋๋ฅผ ์์ฑํ  ๋ ํ์ํ ๊ธฐ๋ณธ ์ต์
          center: new window.kakao.maps.LatLng(37.520749, 126.940251), // ์ง๋์ ์ค์ฌ์ขํ.
          level: 4, // ์ง๋์ ๋ ๋ฒจ(ํ๋, ์ถ์ ์ ๋)
        };

        // ๐4.์๋์ ๋ง๋  ๋ง์ปค๋ฅผ ์ด๋ ํ ๋งต์ ์์ฑํ ๊ฑด์ง ์ง๋์ ๋ณด๋ฅผ map์ ํ ๋น
        const map = new window.kakao.maps.Map(container, options); // ์ง๋ ์์ฑ ๋ฐ ๊ฐ์ฒด ๋ฆฌํด

        // โญ๋ค๋ฅธ ์ด๋ฏธ์ง๋ก ๋ง์ปค ์์ฑ
        const imageSrc =
            "https://png.pngtree.com/png-clipart/20210214/ourlarge/pngtree-hand-drawn-heart-shaped-vector-png-image_2919930.jpg", // โญ๋ง์ปค์ด๋ฏธ์ง์ ์ฃผ์
          imageSize = new kakao.maps.Size(64, 69), // โญ๋ง์ปค์ด๋ฏธ์ง์ ํฌ๊ธฐ
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // โญ๋ง์ปค์ด๋ฏธ์ง์ ์ต์. ๋ง์ปค์ ์ขํ์ ์ผ์น์ํฌ ์ด๋ฏธ์ง ์์์์ ์ขํ๋ฅผ ์ค์ 

        // ๐1.๋ง์ปค๊ฐ ํ์๋  ์์น ์ค์ (์ด๊ธฐ์์น๊ฐ: ๊ฒฝ๋,์๋)
        // โญ๋ง์ปค์ ์ด๋ฏธ์ง์ ๋ณด๋ฅผ ๊ฐ์ง๊ณ  ์๋ ๋ง์ปค์ด๋ฏธ์ง๋ฅผ ์์ฑ
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new kakao.maps.LatLng(37.520749, 126.940251); // ๋ง์ปค๊ฐ ํ์๋  ์์น

        //โ์ฌ๋ฌ๊ฐ ๋ง์ปค ์ ์ดํ๊ธฐ: ์ง๋๋ฅผ ํด๋ฆญํ์๋ ํด๋ฆญํ ์์น์ ๋ง์ปค๋ฅผ ์ถ๊ฐํ๋๋ก ์ง๋์ ํด๋ฆญ์ด๋ฒคํธ๋ฅผ ๋ฑ๋ก
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          // ํด๋ฆญํ ์์น์ ๋ง์ปค๋ฅผ ํ์
          addMarker(mouseEvent.latLng);
        });

        // ์ง๋์ ํ์๋ ๋ง์ปค ๊ฐ์ฒด๋ฅผ ๊ฐ์ง๊ณ  ์์ ๋ฐฐ์ด
        const markers = [];

        // ๋ง์ปค ํ๋๋ฅผ ์ง๋์์ ํ์
        addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

        // ๋ง์ปค๋ฅผ ์์ฑํ๊ณ  ์ง๋์์ ํ์ํ๋ ํจ์
        function addMarker(markerPosition) {
          // ๐2.ํ๋ฉด์ ์ถ๋ ฅํ  ๋ง์ปค ์ ๋ณด ์์ฑ
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // โญ๋ง์ปค์ด๋ฏธ์ง ์ค์ 
          });
          // ๐3.๋ง์ปค๊ฐ ์ง๋ ์์ ํ์๋๋๋ก(ํ๋ฉด์ ์ถ๋ ฅ)(.setMap๋ฉ์๋) -> 5.์์ฑํ ๋ง์ปค๋ฅผ ๋ณ์map์ ์ถ๋ ฅ
          marker.setMap(map);
          // ์์ฑ๋ ๋ง์ปค๋ฅผ ๋ฐฐ์ด์ ์ถ๊ฐ
          markers.push(marker);
        }

        // ๋ฐฐ์ด์ ์ถ๊ฐ๋ ๋ง์ปค๋ค์ ์ง๋์ ํ์ํ๊ฑฐ๋ ์ญ์ ํ๋ ํจ์
        function setMarkers(map) {
          for (const i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }

        // "๋ง์ปค ๋ณด์ด๊ธฐ" ๋ฒํผ์ ํด๋ฆญํ๋ฉด ํธ์ถ๋์ด ๋ฐฐ์ด์ ์ถ๊ฐ๋ ๋ง์ปค๋ฅผ ์ง๋์ ํ์ํ๋ ํจ์
        function showMarkers() {
          setMarkers(map);
        }

        // "๋ง์ปค ๊ฐ์ถ๊ธฐ" ๋ฒํผ์ ํด๋ฆญํ๋ฉด ํธ์ถ๋์ด ๋ฐฐ์ด์ ์ถ๊ฐ๋ ๋ง์ปค๋ฅผ ์ง๋์์ ์ญ์ ํ๋ ํจ์
        function hideMarkers() {
          setMarkers(null);
        }
      });
    };
  }, []);

  return (
    <div>
      <Script src="" />
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </div>
  );
}
