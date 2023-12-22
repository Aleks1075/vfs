import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($userInput: UserInput!) {
    login(userInput: $userInput) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;