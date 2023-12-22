import { gql } from '@apollo/client';

export const GET_REVIEWS_BY_SHIRTS = gql`
  query GetReviewsByShirts($id: ID!) {
    reviewsByShirts(id: $id) {
      id
      title
      text
      rating
      user {
        id
        username
      }
      shirts {
        id
        name
      }
    }
  }
`;