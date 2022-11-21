import gql from 'graphql-tag'

export const ADD_OBSERVATION = gql`
  mutation createObservation($createObservationInput: CreateObservationInput!) {
    createObservation(createObservationInput: $createObservationInput) {
      id
      name
      location {
        area {
          coordinates
          type
        }
        createdAt
        id
        name
        observations {
          active
          bird {
            id
            name
          }
          description
          geolocation {
            coordinates
            type
          }
          id
        }
        updatedAt
      }
      bird {
        id
        name
        category
        description
        fullname
        observations
        url
      }
      createdAt
      description
      geolocation {
        coordinates
        type
      }
      userId
      weather
    }
  }
`
