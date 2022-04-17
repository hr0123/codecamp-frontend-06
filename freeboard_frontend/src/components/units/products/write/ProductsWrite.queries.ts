import { gql } from "@apollo/client";

export const CREATE_USED_ITEM = gql`
  mutation createUsedItem($createUseditemInput: CreateUseditemInput!) {
    createUsedItem(createUseditemInput: $createUseditemInput) {
      _id
      images
    }
  }
`;
