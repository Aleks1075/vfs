import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($orderInput: OrderInput!) {
    createOrder(orderInput: $orderInput) {
      id
      orderDate
      totalPrice
      shirtOrderLines {
        id
        orderLinePrice
        quantity
        shirts {
          id
          name
        }
        size
      }
      user {
        id
        username
      }
    }
  }
`;