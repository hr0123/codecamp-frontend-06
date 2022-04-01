// 게시글 목록 조회 + 무한 스크롤
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;
const FetchMore = styled.div`
  width: 2500px;
  height: 500px;
  overflow: auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const List = styled.div`
  width: 25%;
`;

export default function QuizInfiniteScroller() {
  const { data, fetchMore } = useQuery(FETCH_BOARDS);

  const onLoadMore = () => {
    //1.fetchBoards 없으면 fetchMore 안함
    if (!data) return;

    //2.더 조회 하기
    fetchMore({
      // 전체 게시글 수를 (한 페이지 당 10개씩 나오니까)10으로 나누고 올리고 -> +1(소숫점 아래 부분 위해)
      variables: { page: Math.ceil(data.fetchBoards.length / 10) + 1 },
      // prev(fetchBoards로부터 받은 useQuery)를 수정(update) 로직(2가지 경우)
      updateQuery: (prev, { fetchMoreResult }) => {
        // 더조회하기의 조회게시글이 없으면
        if (!fetchMoreResult.fetchBoards)
          // 기존의 조회게시글 보여주기
          return { fetchBoards: [...prev.fetchBoards] };
        // 더조회하기의 조회게시글이 있으면 -> 기존 조회 + 더조회 결과
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <FetchMore>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
        useWindow={false}
      >
        {data?.fetchBoards.map((el) => (
          <Wrapper key={el._id}>
            <List>{el._id}</List>
            <List>{el.writer}</List>
            <List>{el.title}</List>
          </Wrapper>
        ))}
      </InfiniteScroll>
    </FetchMore>
  );
}
