import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { SuscessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = '/products'
const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<SuscessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string | number) {
    const url = `${URL}/${id}`
    return http.get<SuscessResponse<Product>>(url)
  }
}
export default productApi
