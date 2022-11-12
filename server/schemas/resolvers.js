const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
              });
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
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });

            if (!user) {
              throw new AuthenticationError( "Can't find this user" );
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError( "Wrong password!" );
            }
            const token = signToken(user);
        },
        saveBook: () => {

        },
        removeBook: () => {

        }
    }
}

module.exports = resolvers;
