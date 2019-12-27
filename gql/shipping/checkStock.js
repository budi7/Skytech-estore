import gql from 'graphql-tag'

const checkStock = gql`query stock($products: [String], $warehouse_id: [Int]) {
  Stock (
    product_code: $products,
    warehouse_id: $warehouse_id
  ){
    data{
      product_code,
      product_name,
      available
    }
  }
}`

export default checkStock
