import { gql } from "@apollo/client";

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      useditemAddress {
        address
        addressDetail
        lat
        lng
      }
      createdAt
      seller {
        name
      }
      images
      pickedCount
    }
  }
`;

export const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

export const CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
      name
      # remarks
      contents
      price
    }
  }
`;

export const TOGGLE_USEDITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

// export const FETCH_USEDITEMS_I_PICKED = gql`
//   query fetchUseditemsIPicked($search: String, $page: Int) {
//     fetchUseditemsIPicked(search: $search, page: $page) {
//       _id
//       pickedCount
//     }
//   }
// `;
// export const FETCH_USEDITEMS_COUNT_I_PICKED = gql`
//   query fetchUseditemsCountIPicked {
//     fetchUseditemsCountIPicked
//   }
// `;
