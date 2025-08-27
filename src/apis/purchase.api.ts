import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart: (body: { product_id: string; quantity: number }) => {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(param: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params: param
    })
  },
  buyProduct(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/buy-product`, body)
  },
  updatePurchase(body: { purchase_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}`, body)
  },
  deletePurchase(purchaseIds: string) {
    return http.delete<SuccessResponse<{ delete_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}
export default purchaseApi
