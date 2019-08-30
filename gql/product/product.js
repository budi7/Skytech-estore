import gql from 'graphql-tag'

const product = gql`query Products (
    $page: Int,
    $orderBy: String,
    $orderDesc: Boolean,
    $search: String,
    $id: Int
    $kategori: [Int]
    $brand: String,
    $price_gte: Float,
    $price_lte: Float,
  ) {
  Products (
    limit: 12,
    is_for_sell: true,
    page: $page,
    with_deleted: false,
    order_by: $orderBy,
    order_desc: $orderDesc,
    search: $search,
    id: $id
    in_categories: $kategori,
    brand: $brand,
    price_gte: $price_gte,
    price_lte: $price_lte
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
