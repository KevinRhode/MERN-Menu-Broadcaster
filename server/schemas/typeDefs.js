const typeDefs = `

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Slide {
    _id: ID
    filename: String!
    extname: String!
  }

  type Slideshow {
    _id: ID
    slides: [Slide]    
    comments: String
  }

  type Endpoint {
    _id: ID
    slideshows: [Slideshow]
    deviceId: String!
  }

  type Auth {
    token: ID
    user: User
  } 

  type Query {    
    user: User
    getEndpoint(id: String!): Endpoint
    getAllslides: [Slide]
    getAllslideshow: [Slideshow]  
    getSlideshow(id: String!): Slideshow
  }

  type Mutation {
    addEndpoint(slideshows: [ID]!, deviceId: String!): Endpoint
    updateEndpoint(_id: ID!, slideshows: [ID]): Endpoint
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth  
    addSlide(filename: String!, extname: String!): Slide  
    addSlideshow(slides: [ID]!, comments: String,slideName: String!): Slideshow
    updateUser(firstName: String, lastName: String, email: String, password: String): User    
    updateSlide(filename: String, extname: String): Slide
    updateSlideshow(slides: [ID], comments: String,slideName: String!): Slideshow
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;
