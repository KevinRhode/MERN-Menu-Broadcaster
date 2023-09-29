import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SLIDE = gql`
  mutation addSlide($filename: String!, $extname: String!) {
    addSlide(filename: $filename, extname: $extname) {
      _id
      filename
      extname
    }
  }
`;

export const ADD_SLIDESHOW = gql`
mutation addSlideshow($slides: [ID]!, $comments: String,$slideName: String) {
  addSlideshow(slides: $slides, comments: $comments, slideName: $slideName) {
    comments
    slideName
    _id
    slides {
      _id
    }
  }
}
`

export const ADD_ENDPOINT = gql`
mutation Mutation($slideshows: [ID]!, $deviceId: String!) {
  addEndpoint(slideshows: $slideshows, deviceId: $deviceId) {
    deviceId
    _id
    slideshows {
      _id
    }
  }
}
`;