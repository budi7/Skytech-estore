import gql from 'graphql-tag'

const storeList = gql`query org {
  Organizations (
    is_active: true
  ){
    data{
      id,
      name,
      address,
      city,
      province,
      country,
      postcode,
      contact
    }
  }
}`

export default storeList
