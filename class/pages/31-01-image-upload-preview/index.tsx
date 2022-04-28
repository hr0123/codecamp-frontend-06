import { ChangeEvent, useState } from "react";

export default function ImageUploadPreviewPage() {
  const [imageUrl, setImageUrl] = useState("");

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    // input태그에서 선택한 파일들 중 첫번째(배열에 옵셔널체이닝_파일이 없을수도 있으니까)
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const fileReader = new FileReader();
    // 위의 변수file을 읽어서->임시 url형태로 만들어냄
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      // data.target?.result=다 읽어진 결과물(FileReader의 결과물)
      if (typeof data.target?.result === "string") {
        console.log(data.target?.result);
        setImageUrl(data.target?.result);
      }
    };
  };

  return (
    <div>
      {/* ↓파일 선택 */}
      <input type="file" onChange={onChangeFile} />
      {/* ↓미리보기 : 파일 선택시(onChangeFile함수) FileReader로 주소값(imageUrl) 생김 */}
      <img src={imageUrl} />
    </div>
  );
}
