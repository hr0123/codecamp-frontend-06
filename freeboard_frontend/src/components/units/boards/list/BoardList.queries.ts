import { gql } from "@apollo/client";

// export const FETCH_BOARDS = gql`
//   query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {
//     fetchBoards(endDate: $endDate, startDate: $startDate, search: $search) {
//       _id
//       writer
//       title
//       contents
//       createdAt
//     }
//   }
// `;
export const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;