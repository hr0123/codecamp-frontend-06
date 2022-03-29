import { Rate } from "antd";
import { useState } from "react";
export default function LibraryRatePage() {
  const [value, setValue] = useState(3);

  const handleChange = (value) => {
    setValue(value);
    // alert(`${value}점`);
  };

  return (
    <>
      <Rate onChange={handleChange} value={value} />
      <div>{value}점</div>
    </>
  );
}
