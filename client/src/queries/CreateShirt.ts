import { gql } from '@apollo/client';

export const CREATE_SHIRT = gql`
  mutation CreateShirts($input: ShirtsInput!) {
    createShirts(input: $input) {
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