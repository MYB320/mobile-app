export interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  rating: { rate: number; count: number }
  Quantite?: number
}

export interface ProductsFetcher {
  (limit?: number, sort?: string): Promise<Product[]>
}

export interface ProductFetcher {
  (id: number): Promise<Product>
}

export interface ProductsByCategory {
  (category?: string): Promise<Product[]>
}
