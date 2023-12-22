import { gql } from '@apollo/client';

export const GET_ALL_SHIRTS = gql`
    query GetAllShirts {
        shirts {
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