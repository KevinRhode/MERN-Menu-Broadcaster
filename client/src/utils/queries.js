import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
   
      _id
    lastName
    firstName
    email  
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

export const GET_ENDPOINT = gql`
query getEndpoint($getEndpointId: String!) {
  getEndpoint(id: $getEndpointId) {
    deviceId
    _id
    slideshows {
      _id
      comments
      slides {
        extname
        filename
        _id
      }
    }
  }
}
`;

