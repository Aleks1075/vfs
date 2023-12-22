import { gql } from '@apollo/client';

export const GET_SHIRT_BY_ID = gql`
  query GetShirtById($id: ID!) {
    shirt(id: $id) {
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