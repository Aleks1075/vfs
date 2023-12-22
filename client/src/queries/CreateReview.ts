import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview($reviewInput: ReviewInput!) {
    createReview(reviewInput: $reviewInput) {
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