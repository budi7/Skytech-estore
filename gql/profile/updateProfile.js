import gql from 'graphql-tag'

const updateProfile = gql`mutation StoreCustomer (
  $id: Int
  $name: String
  $address: String,
  $whatsapp: String,
  $email: String,
) {
  StoreCustomer (
    id: $id,
    name: $name,
    address: $address,
    whatsapp: $whatsapp,
    email: $email
  ) {
    id,
    name,
    city,
    address,
    province,
    country,
    postcode,
    whatsapp,
    email
  }
}`

export default updateProfile
