const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
              throw new AuthenticationError('You need to be logged in!');
            }
      
            return User.findOne({ _id: context.user._id })
                    .select("-password")
                    .populate('savedBooks');
          },
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select("-password");
        },
        users: async (parent, { username }) => {
            return User.find({})
            .select("-password");
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password })
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError( "Can't find this user" );
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError( "Wrong password!" );
            }
            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, { entry }, { user }) => {
            console.log(user)
            if(!user) {
                throw new AuthenticationError('Must be logged in to create timeline entries');
              }
              
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: { ...entry } } },
                { new: true, runValidators: true }
                );

            return updatedUser;
        },
        removeBook: async (parent, { bookId }, { user }) => {
            console.log(user)
            console.log(bookId)

            if(!user) {
                throw new AuthenticationError('Must be logged in to create timeline entries');
            }

            const debookedUser = await User.findOneAndUpdate(
                {_id: user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true, runValidators: true }
            );
            return debookedUser;
        }
    }
}

module.exports = resolvers;
