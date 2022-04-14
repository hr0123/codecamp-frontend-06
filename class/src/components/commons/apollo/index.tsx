// Apollo설정 관련 내용들 모아두는 컴포넌트
import {
  ApolloLink,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState, userInfoState } from "../../../commons/store";

export default function ApolloSetting(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserInfo] = useRecoilState(userInfoState);

  // //////////////////////////////////////////////////////////////////////////////////////////////////////
  // 방법1: 더이상 지원되지 않음
  // if(process.browser){
  // }else{
  // }

  // 방법2
  if (typeof window !== "undefined") {
    // 브라우저에서 그려지고있을때
    console.log("여기는 브라우저다!!");
    // const mylocalstorageAccessToken = localStorage.getItem("accessToken");
    // setAccessToken(mylocalstorageAccessToken || ""); //my..Token없으면 초기값인 빈문자열 넣기
  } else {
    // 프론트엔드서버(yarn dev)에서 그려지고있을때
    console.log("여기는 프론트엔드 서버(yarn dev)다!!");
  }

  // 방법3
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}"); //문자열을 다시 객체로, 없으면 빈객체라도
    setAccessToken(accessToken || ""); //my..Token없으면 초기값인 빈문자열 넣기
    setUserInfo(userInfo);
  }, []);

  // 프리렌더링 시 문제되는 코드
  // const mylocalstorageAccessToken = localStorage.getItem("accessToken");
  // setAccessToken(mylocalstorageAccessToken || ""); //my..Token없으면 초기값인 빈문자열 넣기
  // //////////////////////////////////////////////////////////////////////////////////////////////////////

  const uploadLink = createUploadLink({
    uri: "http://backend06.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
