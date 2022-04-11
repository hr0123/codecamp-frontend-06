import { useRecoilState } from "recoil";
import { isEditState } from "../../../../commons/store/index";

// 1.props 사용
// export default function RecoilComponent(props) {
//   return <h1>{props.isEdit ? "수정하기" : "등록하기"}</h1>;
// }

// 2.Recoil 사용
export default function RecoilComponent() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  return <h1>{isEdit ? "수정하기" : "등록하기"}</h1>;
}
