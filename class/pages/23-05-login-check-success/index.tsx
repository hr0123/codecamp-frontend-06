// 로그인 안된 사람은 접근불가하도록
import { useQuery, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
import { withAuth } from "../../src/components/commons/hocs/withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function LoginSuccessPage() {
  // const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     alert("로그인 후 이용 가능합니다!!");
  //     router.push("/23-04-login-check");
  //   }
  // }, []);

  // data가 처음에는 없(undefined)을수있으므로 -> data?로 표기
  return <div>{data?.fetchUserLoggedIn.name}님 환영합니다!!</div>;
}

export default withAuth(LoginSuccessPage);
