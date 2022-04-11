import RecoilComponent from "../../../src/components/units/recoil/write";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/store/index";
// import { useEffect } from "react";

// 1.props 사용
// export default function RecoilEditPage() {
//   return <RecoilComponent isEdit={true} />;
// }

// 2.Recoil 사용
export default function RecoilEditPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  // useEffect(() => {
  //   setIsEdit(true);
  // }, []);

  return <RecoilComponent />;
}
