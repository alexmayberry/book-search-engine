import { gql } from '@apollo/client';

export const GET_ME = gql`
query ME {
  me {
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