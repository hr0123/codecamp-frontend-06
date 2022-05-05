import { gql } from "@apollo/client";

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
    }
  }
`;
// export const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
//   query fetchPointTransactionsOfLoading($search: String, $page: Int) {
//     fetchPointTransactionsOfLoading(search: $search, page: $page) {
//       _id
//       impUid
//       amount
//       # balance
//       createdAt
//     }
//   }
// `;
export const FETCH_USER_LOGGEDIN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      userPoint {
        amount
        # createdAt
        updatedAt
      }
    }
  }
`;
export const FETCH_USED_ITEMS_I_PICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
      name
      remarks
      price
      images
      pickedCount
      seller {
        name
      }
      soldAt
    }
  }
`;
