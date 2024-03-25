<template>
    <div style="width: 100%">
        <el-space direction="vertical" fill style="width: 100%;">
            <el-row>
                <el-col :span="4">
                    <el-button type="primary" @click="openAddModal">
                        Add new Product
                    </el-button>
                </el-col>
            </el-row>
            <el-card>
                <template #header>
                    <div class="card-header">
                        <el-text size="large" tag="b">Filter</el-text>
                    </div>
                </template>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-input
                            v-model="filter.model"
                            placeholder="Search"
                            :prefix-icon="Search"
                            @input="onFilter"
                            />
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="filter.category" placeholder="Category" @change="onFilter" clearable>
                            <el-option
                                v-for="item in categoriesStore.categories"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-col>
                </el-row>
            </el-card>
            <el-card>
                <el-table :data="store.products" height="250" stripe border style="width: 100%">
                    <el-table-column prop="model" label="Модель" />
                    <el-table-column prop="released_date" label="Год релиза" :formatter="dateFormatter" />

                    <!-- Бекенд должен отправит готовый обьект категории, не только id. Но сейчас нет бекенда -->
                    <el-table-column prop="category" label="Категория" :formatter="(row:IProduct) => categoriesStore.getCategoryById(row.category)?.name" />
                    <el-table-column prop="price" label="Рекомендуемая розничная цена" />
                    <el-table-column prop="created_at" label="Дата добавления" :formatter="dateFormatter" />
                    <el-table-column prop="is_visible" label="Видимость товара">
                        <template #default="{ row }">
                            <el-checkbox v-model="row.is_visible" size="large" />
                        </template>
                    </el-table-column>
                    <el-table-column label="Действие">
                        <template #default="{ row }">
                            <el-button type="warning" @click="openEditModal(row)">
                                <Edit style="width: 1em; height: 1em;" />
                            </el-button>
                            <el-button type="danger" @click="onDeleteProductClick(row.id)">
                                <Delete style="width: 1em; height: 1em;" />
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="prev, pager, next" :total="1000" />
            </el-card>
        </el-space>
        <AddEditProductModal v-model="dialogVisible" :is-edit="is_edit" :product="product_to_edit" @success="store.fetchProducts(filter)" />
    </div>
</template>

<script setup lang="ts">
import { Search, Delete, Edit } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCategoriesStore } from '@/stores/categories'
import type { IProduct } from '@/types'
import AddEditProductModal from '@/components/AddEditProductModal.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteProduct } from '@/service/products'

const filter = reactive({
    model: '',
    category: null
})

let timeout = 600
function onFilter() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        store.fetchProducts(filter)
    }, 600)
}

function dateFormatter(row:any, col:any, val:string) {
    return new Date(val).toLocaleDateString()
}

const store = useProductsStore()
const categoriesStore = useCategoriesStore()
const dialogVisible = ref(false)
const is_edit = ref(false)
const product_to_edit = ref({})

function openAddModal() {
    is_edit.value = false
    dialogVisible.value = true
}

function openEditModal(product:IProduct) {
    product_to_edit.value = product
    is_edit.value = true
    dialogVisible.value = true
}

function onDeleteProductClick(id: number) {
  ElMessageBox.confirm(
    'Are you really want to delete?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      deleteProduct(id).then(() => {
          store.fetchProducts(filter)
          ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

onMounted(() => {
    categoriesStore.fetchCategories()
    store.fetchProducts()
})
</script>

<style scoped>

</style>