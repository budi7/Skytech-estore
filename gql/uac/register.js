import gql from 'graphql-tag'

const mutation = gql`mutation register($name: String, $username: String, $password: String){
  Register(name: $name, username: $username, password: $password) {
    id,
    name,
    username
  }
}`

export default mutation
