import gql from 'graphql-tag'

const mutation = gql`mutation login($username: String, $password: String){
  Authenticate(username: $username, password: $password) {
    token,
    user {
      id,
      name,
      username
  }}
}`

export default mutation
