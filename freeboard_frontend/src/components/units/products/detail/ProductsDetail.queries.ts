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
      }
      createdAt
      seller {
        name
      }
      images
    }
  }
`;

export const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

// export const CREATE_POINT_TRANSACTION_OF_BUYINGANDSELLING = gql`
//   mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
//     createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
//       _id
//       name
//       remarks
//       contents
//       price
//     }
//   }
// `;
