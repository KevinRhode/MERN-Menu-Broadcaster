import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const GET_ALL_SLIDES = gql`
query GetSlides {
  slides {
    _id
    filename
    extname
  }
}
`;