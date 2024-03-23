<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <el-container>
    
    <el-header style="padding: 1.5rem; box-shadow: var(--el-box-shadow);">
      <el-page-header :icon="null">
        <template #content>
          <span class="text-large font-600 mr-3"> Device shopmaster </span>
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
