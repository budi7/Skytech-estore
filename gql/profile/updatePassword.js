import gql from 'graphql-tag'

const updatePassword = gql`mutation updatePassword(
  $old_password: String,
  $new_password: String
){
  UpdateMyPassword (
    old_password: $old_password,
    new_password: $new_password
  )
}`

export default updatePassword
