import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuscessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart: (body: { product_id: string; quantity: number }) => {
    return http.post<SuscessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(param: { status: PurchaseListStatus }) {
    return http.get<SuscessResponse<Purchase[]>>(`${URL}`, {
      params: param
    })
  }
}
export default purchaseApi
