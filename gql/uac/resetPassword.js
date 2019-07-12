import gql from 'graphql-tag'

const mutation = gql`mutation ResetPasswordWithToken (
    $token: String
    $username: String
    $password: String
    ){
    ResetPasswordWithToken(
        token: $token,
        username: $username,
        password: $password
    )
}`

export default mutation
