import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProduct[]>([
    {
      id: 1,
      model: 'bkhjbk',
      category: {
        id: 1,
        name: 'jhk'
      },
      released_date: 2012,
      is_visible: true,
      price: '124045.45',
      created_at: '2024-03-24'
    },
    {
      id: 1,
      model: 'bkasadhjbk',
      category: {
        id: 1,
        name: 'jhdk'
      },
      released_date: 2012,
      is_visible: false,
      price: '124045.45',
      created_at: '2024-03-24'
    }
  ])

  return { products }
})
