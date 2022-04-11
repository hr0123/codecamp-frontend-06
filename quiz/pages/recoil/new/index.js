import RecoilComponent from "../../../src/components/units/recoil/write";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/store/index";
import { useEffect } from "react";

// 1.props 사용
// export default function RecoilNewPage() {
//   return <RecoilComponent isEdit={false} />;
// }

// 2.Recoil 사용
export default function RecoilNewPage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return <RecoilComponent />;
}
