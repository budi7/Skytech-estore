import gql from 'graphql-tag'

const myShippingAddress = gql`query myAddress {
  CheckMyShippingAddress {
    receiver_phone,
    receiver_name,
    receiver_address
  }
}`

export default myShippingAddress
