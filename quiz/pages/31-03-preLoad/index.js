import { useEffect, useRef, useState } from "react";

export default function ImagePreload() {
  const [imgTag, setImgTag] = useState();
  const divRef = useRef(null);
  // const [isLoaded, setIsLoaded] = useState(false);

  // 페이지가 열리자마자 사진 다운받아오기(버튼클릭 전)
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpHH3S-RBhsn-x_gWpX2VEbH-S4pV59Z6VzB1J_e5quDYhlulAn22Oa61rbeR8xjoksU&usqp=CAU";
    img.onload = () => {
      setImgTag(img); //이미지가 다운로드받아진 상태인 img태그(img)를 setImgTag에 넣음
    };
  }, []);

  const onClickPreload = () => {
    // document.getElementById("aaa")?.appendChild(imgTag);
    if (imgTag) divRef.current?.appendChild(imgTag);
  };

  // const onClickLoad = () => {
  //   setIsLoaded(true);
  // };

  return (
    <div>
      {/* <div id="aaa">
        <img src="" />
      </div> */}
      <div ref={divRef}></div>
      <button onClick={onClickPreload}>이미지 프리로드</button>
      {/* ======================================= */}
      {/* {isLoaded && (
        <img src="https://pixabay.com/get/g38c8d00a4dcd6230c798d612f69eb660cf5f3d4ea97aa84137d9a0446293c973e533fd1dad078670288462eb268fb802.jpg" />
      )}
      <button onClick={onClickLoad}>이미지 일반로드</button> */}
    </div>
  );
}
