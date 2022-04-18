import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/store";
import { useAuth } from "../../commons/hooks/useAuth";
import MypageUI from "./mypage.presenter";

function Mypage() {
  useAuth();
  const [userInfo] = useRecoilState(userInfoState);
  return <MypageUI userInfo={userInfo} />;
}

export default Mypage;
