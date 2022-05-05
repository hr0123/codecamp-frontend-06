import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

export function useAuth() {
  const router = useRouter();
  const [accessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    if (!accessToken) {
      Modal.error({ content: "로그인 후 이용 가능합니다" });
      router.push("/login");
    }
  }, []);
}
