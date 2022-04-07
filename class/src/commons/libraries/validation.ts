export const checkFileValidation = (myfile?: File) => {
  if (!myfile?.size) {
    alert("파일이 없습니다!");
    return false;
  }

  if (myfile.size > 5 * 1024 * 1024) {
    // 파일크기가 5MB보다 크다면(콘솔의 size는 byte단위)->알림창 후
    alert("파일 용량이 너무 큽니다.(제한: 5MB!!)");
    // 돌려보내기
    return false;
  }

  if (!myfile.type.includes("jpeg") && !myfile.type.includes("png")) {
    // 파일확장자(콘솔에서 type) 조건 미충족 시->알림창 후
    alert("jpeg파일 또는 png파일만 업로드 가능합니다.");
    // 돌려보내기
    return false;
  }

  return true;
};
