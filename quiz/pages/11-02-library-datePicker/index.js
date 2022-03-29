import { DatePicker } from "antd";
import { useState } from "react";

export default function LibraryDatepickerPage() {
  // function onChange(date, dateString) {
  //   console.log(date, dateString);
  // }
  const [date, setDate] = useState("");

  const onChange = (date, dateString) => {
    //dateString=내가 선택한 날짜
    setDate(dateString);
    console.log(dateString);
  };

  return (
    <>
      <DatePicker onChange={onChange} />
      <div>{date.split("-")[1]}</div>
    </>
  );
}
