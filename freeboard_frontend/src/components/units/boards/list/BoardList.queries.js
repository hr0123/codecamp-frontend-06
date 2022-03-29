import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String) {
    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
