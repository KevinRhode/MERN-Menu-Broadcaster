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
{
  getAllslides {
    _id
    filename
    extname
  }
}
`;

export const GET_ALL_SLIDESHOWS = gql`
{
  getAllslideshow {
    _id
    comments
    slides {
      extname
      filename
      _id
    }
  }
}
`;

export const GET_SLIDESHOW = gql`

 {
  getSlideshow(id: $getSlideshowId) {
    comments
    slides {
      extname
      filename
      _id
    }
    _id
  }
}
`;