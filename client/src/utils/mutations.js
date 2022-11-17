import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SAVEBOOK($entry: saveBookInput) {
  saveBook(entry: $entry) {
    _id
    email
    username
    boookCount
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String) {
  removeBook(bookId: $bookId) {
    username
    email
    boookCount
    _id
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;