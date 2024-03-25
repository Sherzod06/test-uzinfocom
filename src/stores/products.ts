import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/types'
import { fetchProductsList } from '@/service/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProduct[]>([
  ])

  function fetchProducts(params?: any) {
    return new Promise((resolve, reject) => {
      fetchProductsList(params).then(res => {
        products.value = res.data
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return { products, fetchProducts }
})
