import gql from 'graphql-tag'

export const OBSERVATIONS = gql`
  query observations {
    observations {
      id
      name
      bird {
        id
        name
      }
      location {
        id
        name
      }
      userId
      createdAt
    }
  }
`

export const OBSERVATION_INSERT_DATA = gql`
  query insertData {
    birds {
      id
      name
    }

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
