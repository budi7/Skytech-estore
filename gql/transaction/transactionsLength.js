import gql from 'graphql-tag'

const transactions = gql`query SalesOrder(
  $customer_id: Int,
  $has_status: Boolean,
  $deleted_only: Boolean,
  $status: String
) {
  SalesOrder (
    customer_id: $customer_id,
    has_status: $has_status,
    deleted_only: $deleted_only,
    status: $status
  ) {
   total
  }
}`

export default transactions
