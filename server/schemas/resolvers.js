const User = require('../models/User');
const Slide = require('../models/Slide');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {   
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw AuthenticationError;
    },
    getAllslides: async (parent, args, context)=>{
      if (context.user) {
        const slides = await Slide.find();
        return slides;
      }
    }

    
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addSlide: async (parent, args, context) => {
      if (context.user) {
        const slide = await Slide.create(args);
        return slide;
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
