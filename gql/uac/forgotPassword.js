import gql from 'graphql-tag'

const mutation = gql`mutation RequestResetPasswordToken($username: String){
    RequestResetPasswordToken( username: $username ) 
}`

export default mutation
