import { gql } from '@apollo/client';

export const UPDATE_SHIRT = gql`
  mutation UpdateShirts($input: ShirtsInput!) {
    updateShirts(input: $input) {
      id
      name
      description
      country
      year
      price
      size
      image
      ratingAvg
    }
  }
`;