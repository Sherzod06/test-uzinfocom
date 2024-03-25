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
                            v-model="filter.search"
                            placeholder="Search"
                            :prefix-icon="Search"
                            @input="onSearch"
                            />
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="filter.category" placeholder="Category">
                            <el-option
                                v-for="item in []"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-col>
                </el-row>
            </el-card>
            <el-card>
                <el-table :data="store.products" height="250" stripe border style="width: 100%">
                    <el-table-column prop="model" label="Модель" />
                    <el-table-column prop="released_date" label="Год релиза" />
                    <el-table-column prop="category" label="Категория" :formatter="(row:IProduct) => row.category?.name" />
                    <el-table-column prop="price" label="Рекомендуемая розничная цена" />
                    <el-table-column prop="created_at" label="Дата добавления" :formatter="dateFormatter" />
                    <el-table-column prop="is_visible" label="Видимость товара">
                        <template #default="{ row }">
                            <el-checkbox v-model="row.is_visible" size="large" />
                        </template>
                    </el-table-column>
                    <el-table-column label="Действие">
                        <el-button type="warning">
                            <Edit style="width: 1em; height: 1em;" />
                        </el-button>
                        <el-button type="danger">
                            <Delete style="width: 1em; height: 1em;" />
                        </el-button>
                    </el-table-column>
                </el-table>
                <el-pagination layout="prev, pager, next" :total="1000" />
            </el-card>
        </el-space>
        <AddEditProductModal v-model="dialogVisible" />
    </div>
</template>

<script setup lang="ts">
import { Search, Delete, Edit } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import type { IProduct } from '@/types'
import AddEditProductModal from '@/components/AddEditProductModal.vue'

const filter = reactive({
    search: '',
    category: null
})

let timeout = 600
function onSearch() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        console.log(filter.search)
    }, 600)
}

function dateFormatter(row:any, col:any, val:string) {
    return new Date(val).toLocaleDateString()
}

const store = useProductsStore()
const dialogVisible = ref(false)
const is_edit = ref(false)

function openAddModal() {
    is_edit.value = false
    dialogVisible.value = true
}
</script>

<style scoped>

</style>