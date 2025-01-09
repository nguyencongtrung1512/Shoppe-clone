import { Category } from "../types/Category.type"
import { SuscessResponse } from "../types/utils.type"
import http from "../utils/http"

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuscessResponse<Category>>(URL)
  }
}
export default categoryApi