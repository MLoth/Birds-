import gql from 'graphql-tag'

export const BIRDS = gql`
  query birds {
    birds {
      id
      name
      url
      description
      category
      observations
    }
  }
`

export const BIRD_BY_ID = gql`
  query bird($id: String!) {
    bird(id: $id) {
      id
      name
      url
      description
      category
      observations
    }
  }
`
