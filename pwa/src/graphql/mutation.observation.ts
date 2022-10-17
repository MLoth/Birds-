import gql from 'graphql-tag'

export const ADD_OBSERVATION = gql`
  mutation createObservation($createObservationInput: CreateObservationInput!) {
    createObservation(createObservationInput: $createObservationInput) {
      id
      name
    }
  }
`
