import Script from "next/script";
import { useEffect } from "react";

// declare const window: typeof globalThis & {
//   kakao: any;
// };

export default function QuizMap1Page() {
  useEffect(() => {
    // 👇Head안 script태그 넣었던 부분을 직접 만들기
    const script = document.createElement("script"); // <script></script>만들어짐
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668&autoload=false";
    document.head.appendChild(script);
    // 👇script가 로드되면 그때, 기존에있던 아래 로직 실행
    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스

        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.520749, 126.940251), // 지도의 중심좌표.
          level: 4, // 지도의 레벨(확대, 축소 정도)
        };

        // 📌4.아래에 만든 마커를 어떠한 맵에 생성할건지 지도정보를 map에 할당
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // ⭐다른 이미지로 마커 생성
        const imageSrc =
            "https://png.pngtree.com/png-clipart/20210214/ourlarge/pngtree-hand-drawn-heart-shaped-vector-png-image_2919930.jpg", // ⭐마커이미지의 주소
          imageSize = new kakao.maps.Size(64, 69), // ⭐마커이미지의 크기
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // ⭐마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

        // 📌1.마커가 표시될 위치 설정(초기위치값: 경도,위도)
        // ⭐마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new kakao.maps.LatLng(37.520749, 126.940251); // 마커가 표시될 위치

        //✅여러개 마커 제어하기: 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          // 클릭한 위치에 마커를 표시
          addMarker(mouseEvent.latLng);
        });

        // 지도에 표시된 마커 객체를 가지고 있을 배열
        const markers = [];

        // 마커 하나를 지도위에 표시
        addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

        // 마커를 생성하고 지도위에 표시하는 함수
        function addMarker(markerPosition) {
          // 📌2.화면에 출력할 마커 정보 생성
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // ⭐마커이미지 설정
          });
          // 📌3.마커가 지도 위에 표시되도록(화면에 출력)(.setMap메소드) -> 5.생성한 마커를 변수map에 출력
          marker.setMap(map);
          // 생성된 마커를 배열에 추가
          markers.push(marker);
        }

        // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수
        function setMarkers(map) {
          for (const i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }

        // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수
        function showMarkers() {
          setMarkers(map);
        }

        // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수
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
