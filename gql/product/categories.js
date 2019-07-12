import gql from 'graphql-tag'

const mutation = gql`query Categories {
  Categories {
    data {
      id,
      category,
    }
  }
}`

export default mutation
