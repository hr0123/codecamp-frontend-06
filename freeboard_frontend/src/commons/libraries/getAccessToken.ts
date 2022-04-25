// 📌RefreshToken 실습
import { GraphQLClient, gql } from "graphql-request";

// Playground BE06
const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

// 2-1.refreshToken으로 accessToken을 재발급 받기
export async function GetAccessToken() {
  try {
    const graphQlClient = new GraphQLClient(
      "https://backend06.codebootcamp.co.kr/graphql",
      { credentials: "include" }
    );
    const result = await graphQlClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    console.log(error.message);
  }
}
