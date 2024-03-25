import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICategory } from '@/types'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<ICategory[]>([])

  return { categories }
})
