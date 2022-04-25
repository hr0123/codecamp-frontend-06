// Apollo설정 관련 내용들 모아두는 컴포넌트
import {
  ApolloLink,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { useRecoilState } from "recoil";
import { createUploadLink } from "apollo-upload-client";
import { accessTokenState, userInfoState } from "../../../commons/store";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { GetAccessToken } from "../../../commons/libraries/getAccessToken";

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
    // const accessToken = localStorage.getItem("accessToken");
    // const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}"); //문자열을 다시 객체로, 없으면 빈객체라도
    // setAccessToken(accessToken || ""); //my..Token없으면 초기값인 빈문자열 넣기
    // setUserInfo(userInfo);
    // //////////////////////////////////////////////////////////////////////////////////////////////////////
    // 📌RefreshToken 실습_accessToken재발급받아서 state에 넣어주기
    GetAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  // 프리렌더링 시 문제되는 코드
  // const mylocalstorageAccessToken = localStorage.getItem("accessToken");
  // setAccessToken(mylocalstorageAccessToken || ""); //my..Token없으면 초기값인 빈문자열 넣기
  // //////////////////////////////////////////////////////////////////////////////////////////////////////

  // 📌RefreshToken 실습_{에러, 방금실패했던 쿼리, 실행 명령어} / 콜백함수
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1.에러를 캐치
    if (graphQLErrors) {
      // 캐치한 에러에 반복문 실행
      for (const err of graphQLErrors) {
        // 1-2.해당 에러가 토큰만료 에러(UNAUTHENTICATED)인지 확인
        if (err.extensions.code === "UNAUTHENTICATED") {
          // 2-1.refreshToken으로 accessToken을 재발급 받기
          GetAccessToken().then((newAccessToken) => {
            // 2-2.글로벌스테이트에 재발급받은accessToken 저장
            setAccessToken(newAccessToken);
            // 3-1.재발급받은 accessToken으로, 방금실패한 쿼리 재요청하기
            operation.setContext({
              headers: {
                ...operation.getContext().headers, //기존헤더 가져온 후
                Authorization: `Bearer ${newAccessToken}`, //재발급받은 accessToken으로 바꿔줌(accessToken만 바꿔치기)
              },
            });
            // 3-2.변경된operation을 재요청하기(실패했던 쿼리를 재요청)
            return forward(operation);
          });
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend06.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
