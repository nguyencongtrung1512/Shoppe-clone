import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { suscessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = '/products'
const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<suscessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string | number) {
    const url = `${URL}/${id}`
    return http.get<suscessResponse<Product>>(url)
  }
}
export default productApi
