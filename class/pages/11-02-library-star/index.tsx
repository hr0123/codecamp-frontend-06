import { useState } from "react";
import { Rate } from "antd";

export default function LibraryStarPage() {
  const [value, setValue] = useState(3); // 초기값 별3개
  // state = {
  //   value: 3,
  // };
  const handleChange = (value: any) => {
    // 클릭하면->클릭한 별값이 setValue(value)에 들어옴
    setValue(value);
  };
  // handleChange = value => {
  //   this.setState({ value });
  // };

  return <Rate onChange={handleChange} value={value} />;
  //  <Rate tooltips={desc} onChange={this.handleChange} value={value} />
}
