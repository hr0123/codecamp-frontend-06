import { useEffect, useState } from "react";
import GlobalStateContainer from "../../src/components/units/boards/21-global-state/BoardWrite.container";
import { useRecoilState } from "recoil";
import { isEditState } from "../../src/commons/store/index";

export default function GlobalStatePage() {
  // const [isEdit, setIsEdit] = useState(false);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(true);
  }, []);

  return <GlobalStateContainer />;
}
