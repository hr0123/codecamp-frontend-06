import { useQuery, gql } from "@apollo/client";
import { withAuth } from "../../../../src/components/commons/example/hoc/withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function QuizMainPage() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  return <div>{data?.fetchUserLoggedIn.name} 회원님 환영합니다!!</div>;
}

export default withAuth(QuizMainPage);
