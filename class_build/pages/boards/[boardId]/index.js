import { useRouter } from "next/router";
import Head from "next/head";
import { gql, request } from "graphql-request";

export default function BoardDetailPage(props) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <meta property="og:title" content={props.myboardData.title} />
        <meta property="og:description" content={props.myboardData.contents} />
        <meta property="og:image" content={props.myboardData.images[0]} />
      </Head>
      <div>
        안녕하세요! 게시글 상세페이지 입니다!!!, 게시글 ID는
        {router.query.boardId}입니다!!!
      </div>
    </div>
  );
}

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      titld
      contents
      images
    }
  }
`;

// 이 페이지는 서버사이드 렌더링 할래!!
// 📌정해진 함수명(변경 불가), 이 함수가 있는 페이지 = SSR하는 페이지
export const getServerSideProps = async (context) => {
  // 데이터를 요청할 것!!! (useQuery불가 => graphql-request설치+사용 => request라이브러리_variables안써도됨)
  // 📌Frontend서버에 접속하여 Backend에 요청하는 사항
  // const {data} = useQuery(FETCH_BOARD); // 현재는 Apollo셋팅 안해놔서,useQuery는 불가
  const result = await request(
    "https://backend06.codebootcamp.co.kr/graphql",
    FETCH_BOARD,
    { boardId: context.query.boardId }
  );

  return {
    props: {
      myboardData: {
        title: result.fetchBoard.title,
        contents: result.fetchBoard.contents,
        images: result.fetchBoard.images,
      },
    },
  };
};
