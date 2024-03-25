<script setup lang="ts">
import { RouterView, useRouter, RouterLink } from 'vue-router'

const router = useRouter()
</script>

<template>
  <el-container>
    
    <el-header style="padding: 1.5rem; box-shadow: var(--el-box-shadow);">
      <el-page-header :icon="null" @back="router.go(-1)">
        <template #content>
          <span class="text-large font-600 mr-6"> Device shopmaster </span>
          <router-link :to="{ name: 'products' }">Products</router-link>
        </template>
      </el-page-header>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
