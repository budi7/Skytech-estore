import gql from 'graphql-tag'

const product = gql`query Products (
    $page: Int,
    $orderBy: String,
    $orderDesc: Boolean,
    $id: Int
  ) {
  Products (
    limit: 12,
    is_for_sell: true,
    page: $page,
    with_deleted: false,
    order_by: $orderBy,
    order_desc: $orderDesc,
    id: $id
  ) {
    data {
      id,
      upc,
      name,
      price {
        price,
        discount
      },
      medias{
        id,
        title,
        description,
        url
      }
    },
    has_more_pages,
    current_page
  }
}`

export default product
