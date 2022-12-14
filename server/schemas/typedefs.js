const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        boookCount: Int
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
    token: ID!
    user: User
    }

    input saveBookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
        user(username: String!): User
        users: [User]
    }

    type Mutation {
        login( email: String!, password: String! ): Auth
        addUser( username: String!, email: String!, password: String!): Auth
        saveBook(entry: saveBookInput): User # why does this return a user?
        removeBook(bookId: String): User
    } 
`

module.exports = typeDefs;