import { gql } from '@apollo/client';

export const DELETE_SHIRT = gql`
  mutation DeleteShirts($id: ID!) {
    deleteShirts(id: $id) {
      id
    }
  }
`;