import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
  query findByUid($uid: String!) {
    findByUid(uid: $uid) {
      id
      uid
      observations {
        id
        name
        description
        createdAt
        updatedAt
      }
      observationsCount
      createdAt
      updatedAt
    }
  }
`
