import { gql } from "@apollo/client";

export const FETCH_USED_ITEM = gql`
  query fetchUsedItem($useditemId: ID!) {
    fetchUsedItem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      useditemAddress
      seller
      createdAt
    }
  }
`;
