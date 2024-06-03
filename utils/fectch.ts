import {
  ProductsFetcher,
  ProductFetcher,
  ProductsByCategory,
} from './interface'

export const getProducts: ProductsFetcher = async (
  limit = 30,
  sort = 'asc'
) => {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}&sort=${sort}`
    )
    return await res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

export const getProduct: ProductFetcher = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    return await res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

export const getProductsByCategory: ProductsByCategory = async (category) => {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    )
    return await res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}
