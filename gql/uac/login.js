import gql from 'graphql-tag'

const mutation = gql`mutation login($username: String, $password: String){
  Authenticate(username: $username, password: $password) {
    token,
    user {
      id,
      username,
      customer_id,
      customer {
        name,
        address,
        city,
        province,
        country,
        postcode,
        email,
        whatsapp,
      }
  }}
}`

export default mutation
