// 백엔드에서 인가(Ahthorization) 과정 이뤄짐
import { useQuery, gql } from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccessPage() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  // data가 처음에는 없을수있으므로(undefined) -> data?로 표기
  return <div>{data?.fetchUserLoggedIn.name}님 환영합니다!!</div>;
}
