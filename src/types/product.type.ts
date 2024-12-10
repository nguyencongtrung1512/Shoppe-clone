export interface Product {
  _id: string
  images: string[]
  image: string
  name: string
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  description: string
  price: number
  createdAt: string
  updatedAt: string
  category: {
    _id: string
    name: string
  }
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number
  limit?: number
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
