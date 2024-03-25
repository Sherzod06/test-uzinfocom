import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICategory } from '@/types'
import { fetchCategoriesList } from '@/service/categories'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<ICategory[]>([])

  function fetchCategories() {
    return new Promise((resolve, reject) => {
      fetchCategoriesList().then(res => {
        categories.value = res.data
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  function getCategoryById(id:number) {
    return categories.value.find(el => el.id === id)
  }

  return { categories, fetchCategories, getCategoryById }
})
