import { InstagramOutlined } from "@ant-design/icons";

// 라이브러리 아이콘에 emotion css 적용하기
import styled from "@emotion/styled";
const MyIcon = styled(InstagramOutlined)`
  font-size: 50px;
  color: red;
`;

export default function LibraryIconPage() {
  // return <InstagramOutlined />;
  return <MyIcon />;
}
// antdesign사이트에서 icon클릭 후->return에 붙여넣기
