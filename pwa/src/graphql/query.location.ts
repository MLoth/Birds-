import gql from 'graphql-tag'

export const LOCATIONS = gql`
  query locations {
    locations {
      id
      name
      area {
        type
        coordinates
      }
    }
  }
`
