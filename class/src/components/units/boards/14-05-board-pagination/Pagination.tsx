import { useState } from "react";

export default function Pagination(props) {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event) => {
    props.refetch({ page: Number(event.target.id) }); //onClickPage함수가 id별로 실행됨
  };

  // 이전 페이지 클릭 시->페이지번호 첫번째꺼(prev startPage)-10
  const onClickPrevPage = () => {
    //📌startPage가 1이면 로직실행 중단
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    props.refetch({ page: startPage - 10 }); //onClickPage함수가 id별로 실행됨
  };

  // 다음 페이지 클릭 시->페이지번호 첫번째꺼(prev startPage)+10
  const onClickNextPage = () => {
    //📌startPage+10(다음나올페이지의 startPage)가 lastPage이거나 더 작아야함->안그러면 로직실행 중단
    if (!(startPage + 10 <= props.lastPage)) return;
    setStartPage((prev) => prev + 10);
    props.refetch({ page: startPage + 10 }); //onClickPage함수가 id별로 실행됨
  };

  return (
    <>
      <span onClick={onClickPrevPage}>이전 페이지</span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= props.lastPage && (
            <span
              key={index + startPage}
              onClick={onClickPage}
              id={String(index + startPage)}
            >
              {` `} {index + startPage}
            </span>
          )
      )}
      <span onClick={onClickNextPage}>다음 페이지</span>
    </>
  );
}
