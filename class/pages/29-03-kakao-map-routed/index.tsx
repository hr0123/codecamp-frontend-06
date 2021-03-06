import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    // πHeadμ scriptνκ·Έ λ£μλ λΆλΆμ μ§μ  λ§λ€κΈ°
    const script = document.createElement("script"); // <script></script>λ§λ€μ΄μ§
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668&autoload=false";
    document.head.appendChild(script);
    // πscriptκ° λ‘λλλ©΄ κ·Έλ, κΈ°μ‘΄μμλ μλ λ‘μ§ μ€ν
    script.onload = () => {
      window.kakao.maps.load(function () {
        // v3κ° λͺ¨λ λ‘λλ ν, μ΄ μ½λ°± ν¨μκ° μ€νλ©λλ€.
        const container = document.getElementById("map"); // μ§λλ₯Ό λ΄μ μμ­μ DOM λ νΌλ°μ€
        const options = {
          // μ§λλ₯Ό μμ±ν  λ νμν κΈ°λ³Έ μ΅μ
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // μ§λμ μ€μ¬μ’ν.
          level: 3, // μ§λμ λ λ²¨(νλ, μΆμ μ λ)
        };
        const map = new window.kakao.maps.Map(container, options); // μ§λ μμ± λ° κ°μ²΄ λ¦¬ν΄
      });
    };
  }, []);

  return (
    <div>
      {/* <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668" //λ΄ μ΄νλ¦¬μΌμ΄μ JavaScript ν€
        ></script>
      </Head> */}
      <Script src="" />
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </div>
  );
}
